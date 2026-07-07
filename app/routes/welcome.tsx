import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Phone, LockKey, Globe, Heart, ChatsCircle, CaretDown } from "@phosphor-icons/react";

export default function Welcome() {
  const [showLogo, setShowLogo] = useState(true);

  // LOOP WA: Tampil 2s -> Fade 500ms -> Pause 800ms -> Ganti
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo(prev =>!prev);
    }, 3300); // 2000 tampil + 500 fade + 800 pause
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-start justify-center bg-white dark:bg-zinc-950 px-4 pt-8 pb-8 sm:items-center">
      <div className="w-full max-w-[420px] bg-white dark:bg-zinc-950 rounded-2xl">
        <div className="flex flex-col items-center px-6 pt-12 pb-6">

          {/* AREA ILUSTRASI - TINGGI DIKUNCI */}
          <div className="relative w-48 h-48 flex items-center justify-center">

            {/* LOGO 192.PNG */}
            <img
              src="/assets/192.png"
              alt="READTalk Logo"
              className={`w-24 h-24 rounded-2xl shadow-sm absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${showLogo? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            />

            {/* 5 ICON PHOSPHOR BERANTAKAN */}
            <div className={`absolute w-full h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${!showLogo? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <ChatsCircle size={32} weight="fill" className="absolute top-2 left-4 text-neutral-300 dark:text-neutral-700" />
              <Phone size={24} weight="fill" className="absolute top-6 right-2 text-neutral-300 dark:text-neutral-700" />
              <LockKey size={28} weight="fill" className="absolute bottom-8 left-2 text-neutral-300 dark:text-neutral-700" />
              <Globe size={26} weight="fill" className="absolute bottom-4 right-6 text-neutral-300 dark:text-neutral-700" />
              <Heart size={22} weight="fill" className="absolute top-1/2 -right-2 text-neutral-300 dark:text-neutral-700" />
            </div>
          </div>

          {/* TEKS */}
          <h1 className="mt-6 text-2xl font-bold text-neutral-900 dark:text-white text-center">
            Welcome to READTalk
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 text-center leading-5">
            Read our <Link to="/privacy" className="text-[#FF0000] font-medium">Privacy Policy</Link>. Tap "Agree and continue" to accept the <Link to="/tos" className="text-[#FF0000] font-medium">Terms of Service</Link>.
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Globe size={18} />
            <select className="appearance-none bg-transparent text-center focus:outline-none">
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
            <CaretDown size={14} />
          </div>
        </div>

        <div className="w-full px-6 pb-6">
          <Link to="/register" className="flex w-full h-14 items-center justify-center rounded-full bg-[#FF0000] text-base font-semibold text-white shadow-md transition active:scale-[0.98] hover:bg-[#CC0000]">
            Agree and continue
          </Link>
        </div>

      </div>
    </div>
  );
}
