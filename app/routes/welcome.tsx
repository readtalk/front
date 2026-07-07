// app/routes/welcome.tsx
import { Link } from "react-router-dom";
import { Phone, LockKey, Globe, Heart, ChatsCircle, CaretDown } from "@phosphor-icons/react";

export default function Welcome() {
  return (
    // 1. WRAPPER: Center di desktop. bg sama
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950 px-4 py-6">

      {/* 2. CARD INVISIBLE: max-w sama, bg sama, cuma ada padding */}
      <div className="w-full max-w-[420px] bg-white dark:bg-zinc-950 rounded-2xl">

        {/* KONTEN DALAM: px-6 pt-12 pb-6 */}
        <div className="flex flex-col items-center px-6 pt-12 pb-6">

          {/* ILUSTRASI: 5 icon + logo 192.png */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <img src="/assets/192.png" alt="READTalk Logo" className="w-24 h-24 rounded-2xl shadow-sm animate-[fadeIn_0.4s_ease-out]" />
            <ChatsCircle size={32} weight="fill" className="absolute top-2 left-4 text-neutral-300 dark:text-neutral-700 animate-[fadeIn_0.4s_ease-out_0.1s]" />
            <Phone size={24} weight="fill" className="absolute top-6 right-2 text-neutral-300 dark:text-neutral-700 animate-[fadeIn_0.4s_ease-out_0.2s]" />
            <LockKey size={28} weight="fill" className="absolute bottom-8 left-2 text-neutral-300 dark:text-neutral-700 animate-[fadeIn_0.4s_ease-out_0.3s]" />
            <Globe size={26} weight="fill" className="absolute bottom-4 right-6 text-neutral-300 dark:text-neutral-700 animate-[fadeIn_0.4s_ease-out_0.4s]" />
            <Heart size={22} weight="fill" className="absolute top-1/2 -right-2 text-neutral-300 dark:text-neutral-700 animate-[fadeIn_0.4s_ease-out_0.5s]" />
          </div>

          {/* JUDUL + TEKS: mt-6 mt-2 */}
          <h1 className="mt-6 text-2xl font-bold text-neutral-900 dark:text-white text-center">
            Welcome to READTalk
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 text-center leading-5">
            Read our <Link to="/privacy" className="text-[#FF0000] font-medium">Privacy Policy</Link>. Tap "Agree and continue" to accept the <Link to="/tos" className="text-[#FF0000] font-medium">Terms of Service</Link>.
          </p>

          {/* DROPDOWN: mt-4 */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Globe size={18} />
            <select className="appearance-none bg-transparent text-center focus:outline-none">
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
            <CaretDown size={14} />
          </div>
        </div>

        {/* TOMBOL: pb-6 px-6. Jadi mepet ke teks di atas, ga jauh */}
        <div className="w-full px-6 pb-6">
          <Link
            to="/register"
            className="flex w-full h-14 items-center justify-center rounded-full bg-[#FF0000] text-base font-semibold text-white shadow-md transition active:scale-[0.98] hover:bg-[#CC0000]"
          >
            Agree and continue
          </Link>
        </div>

      </div>
    </div>

    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `}</style>
  );
}
