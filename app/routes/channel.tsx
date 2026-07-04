import { useParams, useNavigate } from 'react-router-dom';
import { Hash, Lock, ArrowDown, DotsThree } from "@phosphor-icons/react";
import { useChatContext } from "~/providers/ChatProvider";
import { useWebSocket } from "~/providers/WebSocketProvider";
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { Message, User } from '~/types/chat';
import { useModal } from '~/providers/ModalProvider';
import { InviteUsersModal } from '~/components/modals/InviteUsersModal';
import { ChatInput } from '~/components/ChatInput';

export default function Channel() {
    const { id } = useParams();
    const { channels, users, loadChannelMessages, hasMoreMessages, onlineUsers } = useChatContext();
    const { addMessageListener, removeMessageListener, isConnected, reconnect } = useWebSocket();
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [localMessages, setLocalMessages] = useState<Message[]>([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const isNearBottomRef = useRef(true);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const userMap = useMemo(() => {
        return users.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {} as Record<string, User>);
    }, [users]);

    const getUserInitials = (userId: string) => {
        const user = userMap[userId];
        if (user) {
            return (user.first_name[0] + user.last_name[0]).toUpperCase();
        }
        return userId.slice(0, 2).toUpperCase();
    };

    const getColorFromName = (name: string) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h = Math.abs(hash % 360);
        return `hsl(${h}, 70%, 50%)`;
    };

    const getContrastColor = (hsl: string) => {
        const lightness = parseInt(hsl.split(',')[2].replace('%)', ''));
        return lightness > 65 ? '#000000' : '#ffffff';
    };

    const currentChannel = channels.find(channel => channel.id.toString() === id);

    const checkIfNearBottom = () => {
        const container = messageContainerRef.current;
        if (!container) return;
        const threshold = 100;
        const isNear = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
        isNearBottomRef.current = isNear;
        setShowScrollButton(!isNear);
    };

    const scrollToBottom = () => {
        messageContainerRef.current?.scrollTo({
            top: messageContainerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    };

    const handleScroll = useCallback(() => {
        const container = messageContainerRef.current;
        if (!container) return;

        if (container.scrollTop <= 50 && hasMoreMessages && !isLoadingMessages && localMessages.length > 0 && currentChannel) {
            const scrollHeight = container.scrollHeight;
            const earliestMessage = localMessages.reduce((earliest, current) => 
                current.created_at < earliest.created_at ? current : earliest
            );
            
            fetch(`https://backend.soeparnocorp.workers.dev/channel/messages?before=${earliestMessage.id}`, {
                headers: {
                    'X-Session-Id': localStorage.getItem('session') || '',
                    'X-Channel-Id': currentChannel.id
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setLocalMessages(prev => 
                        [...prev, ...data.messages].sort((a, b) => a.created_at - b.created_at)
                    );
                    requestAnimationFrame(() => {
                        const newScrollHeight = container.scrollHeight;
                        container.scrollTop = newScrollHeight - scrollHeight;
                    });
                }
            })
            .catch(error => console.error('Error loading more messages:', error));
        }

        checkIfNearBottom();
    }, [hasMoreMessages, isLoadingMessages, localMessages, currentChannel?.id]);

    useEffect(() => {
        if (id) {
            addMessageListener(id, (message) => {
                setLocalMessages(prev => [...prev, message]);
                if (isNearBottomRef.current) {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            const container = messageContainerRef.current;
                            if (container) {
                                container.scrollTop = container.scrollHeight;
                            }
                        });
                    });
                }
            });
            
            return () => {
                removeMessageListener(id);
            };
        }
    }, [id]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!currentChannel) return;
            setIsLoadingMessages(true);
            try {
                const response = await fetch('https://backend.soeparnocorp.workers.dev/channel/messages', {
                    headers: {
                        'X-Session-Id': localStorage.getItem('session') || '',
                        'X-Channel-Id': currentChannel.id
                    }
                });

                const data = await response.json();
                if (data.success) {
                    setLocalMessages(data.messages.reverse());
                    setTimeout(() => {
                        messageContainerRef.current?.scrollTo({
                            top: messageContainerRef.current.scrollHeight,
                            behavior: 'instant'
                        });
                    }, 10);
                } else {
                    console.error('Failed to fetch messages');
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setIsLoadingMessages(false);
            }
        };

        fetchMessages();
    }, [currentChannel?.id]);

    useEffect(() => {
        const handleFocus = async () => {
            if (!isConnected()) {
                reconnect();
            }
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [id, isConnected, reconnect]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInviteUsers = () => {
        if (!currentChannel) return;
        openModal(<InviteUsersModal onClose={closeModal} channel={currentChannel} />);
        setShowDropdown(false);
    };

    const handleLeaveChannel = async () => {
        try {
            const response = await fetch(`https://backend.soeparnocorp.workers.dev/channels/${currentChannel?.id}/leave`, {
                method: 'POST',
                headers: {
                    'X-Session-Id': localStorage.getItem('session') || '',
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to leave channel');
            }
            
            navigate('/channel/0');
            setShowDropdown(false);
        } catch (error) {
            console.error('Error leaving channel:', error);
        }
    };

    if (!currentChannel) {
        return <div className="p-4">Channel not found</div>;
    }

    const handleSubmit = async (e: React.FormEvent, assets: string[]) => {
        e.preventDefault();
        if (!message.trim() || isSending) return;

        setIsSending(true);
        try {
            const response = await fetch('https://backend.soeparnocorp.workers.dev/channel/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Channel-Id': currentChannel.id,
                    'X-Session-Id': localStorage.getItem('session') || '',
                },
                body: JSON.stringify({ 
                    content: message,
                    assets: assets 
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            if (data.success && data.message) {
                // setLocalMessages(prev => [...prev, data.message]);
                if (isNearBottomRef.current) {
                    requestAnimationFrame(() => {
                        messageContainerRef.current?.scrollTo({
                            top: messageContainerRef.current.scrollHeight,
                            behavior: 'smooth'
                        });
                    });
                }
            }

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString();
    };

    return (
        <div className="flex flex-col h-full">
            {/* Channel Header */}
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 border-b border-neutral-200 dark:border-neutral-800">
                {/* Tombol Kembali - mobile only */}
                <button 
                    onClick={() => navigate('/overview')}
                    className="md:hidden p-1 -ml-1 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded"
                >
                    ←
                </button>

                <div className="flex-1 min-w-0">
                    <h1 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                        {currentChannel.is_private ? (
                            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        ) : (
                            <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        )}
                        <span className="truncate">{currentChannel.name}</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {currentChannel.description || "No description available"}
                    </p>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="flex -space-x-2">
                        {users
                            .filter(user => currentChannel.member_ids.includes(user.id))
                            .slice(0, 3)
                            .map(user => (
                                <div 
                                    key={user.id} 
                                    className="relative flex-shrink-0"
                                    title={`${user.first_name} ${user.last_name}`}
                                >
                                    <div 
                                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-sm font-medium"
                                        style={{ 
                                            backgroundColor: getColorFromName(`${user.first_name} ${user.last_name}`),
                                            color: getContrastColor(getColorFromName(`${user.first_name} ${user.last_name}`))
                                        }}
                                    >
                                        {getUserInitials(user.id)}
                                    </div>
                                    <div 
                                        className={`absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-white
                                            ${onlineUsers.some(u => u.id === user.id) ? 'bg-green-500' : 'bg-gray-400'}`}
                                    />
                                </div>
                            ))}
                        {users.filter(user => currentChannel.member_ids.includes(user.id)).length > 3 && (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800">
                                +{users.filter(user => currentChannel.member_ids.includes(user.id)).length - 3}
                            </div>
                        )}
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="p-1 sm:p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full"
                        >
                            <DotsThree weight="bold" className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg z-10 py-1">
                                <button
                                    onClick={handleInviteUsers}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                >
                                    Invite Users
                                </button>
                                <button
                                    onClick={handleLeaveChannel}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                >
                                    Leave Channel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Message List */}
            <div className="flex-1 min-h-0 relative">
                <div 
                    ref={messageContainerRef}
                    onScroll={handleScroll}
                    className="h-full overflow-y-auto p-2 sm:p-4"
                >
                    {isLoadingMessages ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {localMessages.map((msg) => {
                                const user = userMap[msg.user_id];
                                const displayName = user 
                                    ? `${user.first_name} ${user.last_name}`
                                    : msg.user_id.split('-')[0];
                                const assets = JSON.parse(msg.assets) as string[];

                                return (
                                    <div key={msg.id} className="flex items-start group">
                                        <div 
                                            className="w-8 h-8 sm:w-9 sm:h-9 rounded flex-shrink-0 flex items-center justify-center font-medium text-xs sm:text-sm"
                                            style={{ 
                                                backgroundColor: getColorFromName(displayName),
                                                color: getContrastColor(getColorFromName(displayName))
                                            }}
                                        >
                                            {getUserInitials(msg.user_id)}
                                        </div>
                                        
                                        <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                                            <div className="flex items-center flex-wrap gap-x-2">
                                                <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">
                                                    {displayName}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(msg.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-words">
                                                {msg.content}
                                            </p>
                                            {assets.length > 0 && (
                                                <div className="mt-2 flex flex-col gap-2">
                                                    {assets.map((url, index) => (
                                                        <img 
                                                            key={index}
                                                            src={url}
                                                            alt="Uploaded content"
                                                            className="max-w-[200px] sm:max-w-[300px] max-h-[200px] sm:max-h-[300px] rounded-lg"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {showScrollButton && (
                    <button
                        onClick={scrollToBottom}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg hover:bg-blue-600 flex items-center gap-2 text-sm sm:text-base"
                    >
                        <ArrowDown weight="bold" className="w-4 h-4" />
                        <span className="hidden sm:inline">Scroll to latest</span>
                        <span className="sm:hidden">Latest</span>
                    </button>
                )}
            </div>

            <ChatInput 
                message={message}
                onChange={setMessage}
                onSubmit={handleSubmit}
                isSending={isSending}
                channelId={currentChannel.id}
                sessionId={localStorage.getItem('session') || ''}
            />
        </div>
    );
}
