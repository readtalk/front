// app/routes/welcome.tsx
import { Link } from "react-router-dom";
import { ChatsCircle, Globe, CaretDown } from "@phosphor-icons/react";

export default function Welcome() {
  return (
    // FULL SCREEN, BUKAN CARD. SAMA KAYAK SS WA LU
    <div className="flex min-h-screen flex-col justify-between bg-white dark:bg-zinc-950">

      {/* ATAS: pt-12 px-4. px-4 ngikut register biar di desktop ga kepotong */}
      <div className="flex flex-col items-center px-4 pt-12">

        {/* Logo: w-20 h-20. SAMA KAYAK KODE AWAL LU */}
        <div className="w-20 h-20 bg-[#FF0000] rounded-full flex items-center justify-center text-white shadow-sm">
          <ChatsCircle size={40} weight="fill" />
        </div>

        {/* Judul: mt-6 text-3xl. SAMA PERSIS KAYAK REGISTER */}
        <h1 className="mt-6 text-3xl font-bold text-neutral-900 dark:text-white text-center tracking-tight">
          Welcome to READTalk
        </h1>

        {/* Deskripsi: mt-2 text-sm max-w-[420px]. max-w nya ngikut lebar card register */}
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 text-center max-w-[420px] leading-5">
          Read our <Link to="/privacy" className="text-[#FF0000] font-medium hover:underline">Privacy Policy</Link>. Tap "Agree and continue" to accept the <Link to="/tos" className="text-[#FF0000] font-medium hover:underline">Terms of Service</Link>.
        </p>

        {/* Dropdown: mt-4 w-full max-w-[420px]. SAMA LEBAR KAYAK CARD REGISTER */}
        <div className="mt-4 w-full max-w-[420px]">
          <div className="relative">
            <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <select className="w-full appearance-none rounded-md border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-10 py-2 text-sm text-neutral-700 dark:text-neutral-200 ring-1 ring-neutral-300 dark:ring-zinc-700 focus:ring-2 focus:ring-[#FF0000] focus:outline-none">
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
            <CaretDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* BAWAH: px-4 pb-10. px-4 ngikut register, pb-10 ngikut WA */}
      <div className="w-full px-4 pb-10">
        {/* Tombol: w-full max-w-[420px] mx-auto. Jadi di desktop dia 420px di tengah */}
        {/* py-2 px-3 text-sm SAMA PERSIS KAYAK TOMBOL REGISTER */}
        <Link
          to="/register"
          className="mx-auto flex w-full max-w-[420px] items-center justify-center rounded-md bg-[#FF0000] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#CC0000] active:scale-[0.98]"
        >
          Agree and continue
        </Link>
      </div>
    </div>
  );
}
