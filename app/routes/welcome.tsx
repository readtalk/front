import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Phone, LockKey, Globe, Heart, ChatText, CaretDown } from "@phosphor-icons/react"; // CaretDown dibalikin

export default function Welcome() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo(prev =>!prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-start justify-center bg-white dark:bg-zinc-950 px-4 pt-8 pb-8 sm:items-center">
      <div className="w-full max-w-[420px] bg-white dark:bg-zinc-950 rounded-2xl">
        <div className="flex flex-col items-center px-6 pt-12 pb-6">

          {/* AREA ILUSTRASI GEDE */}
          <div className="relative w-64 h-64 flex items-center justify-center">

            <img
              src="/assets/192.png"
              alt="READTalk Logo"
              className={`w-28 h-28 rounded-2xl shadow-lg absolute z-10 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${showLogo? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
            />

            <div className={`absolute w-full h-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${!showLogo? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <ChatText size={160} weight="fill" className="absolute top-4 left-0 text-neutral-200 dark:text-neutral-800 rotate-[-10deg]" />
              <Globe size={100} weight="fill" className="absolute top-0 right-4 text-neutral-300 dark:text-neutral-700" />
              <ChatText size={140} weight="fill" className="absolute bottom-6 left-8 text-neutral-200 dark:text-neutral-800 rotate-" />
              <LockKey size={70} weight="fill" className="absolute bottom-2 right-6 text-neutral-400 dark:text-neutral-600" />
              <Phone size={60} weight="fill" className="absolute top-8 left-4 text-neutral-400 dark:text-neutral-600" />
              <Heart size={50} weight="fill" className="absolute bottom-10 left-4 text-neutral-400 dark:text-neutral-600" />
            </div>
          </div>

          {/* TEKS */}
          <h1 className="mt-6 text-2xl font-bold text-neutral-900 dark:text-white text-center">
            Welcome to READTalk
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 text-center leading-5">
            Read our <Link to="/privacy" className="text-[#FF0000] font-medium">Privacy Policy</Link>. Tap "Agree and continue" to accept the <Link to="/tos" className="text-[#FF0000] font-medium">Terms of Service</Link>.
          </p>

          {/* DROPDOWN BAHASA - INI YG HILANG TADI */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Globe size={18} />
            <select className="appearance-none bg-transparent text-center focus:outline-none">
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
            <CaretDown size={14} />
          </div>
        </div>

        {/* TOMBOL */}
        <div className="w-full px-6 pb-6">
          <Link to="/register" className="flex w-full h-14 items-center justify-center rounded-full bg-[#FF0000] text-base font-semibold text-white shadow-md transition active:scale-[0.98] hover:bg-[#CC0000]">
            Agree and continue
          </Link>
        </div>

      </div>
    </div>
  );
}
