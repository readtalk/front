// app/routes/welcome.tsx
import { Link } from "react-router-dom";
import { ChatsCircle, Globe, CaretDown } from "@phosphor-icons/react";

export default function Welcome() {
  return (
    // SAMA KAYAK REGISTER: center di tengah layar
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-zinc-950 px-4">

      {/* SAMA KAYAK REGISTER: w-full max-w-[420px] p-8 rounded-2xl shadow-sm */}
      <div className="w-full max-w-[420px] rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-sm">

        {/* KONTEN DALAM CARD */}
        <div className="flex flex-col items-center text-center">

          {/* Logo: w-20 h-20 - dari kode awal lu */}
          <div className="w-20 h-20 bg-[#FF0000] rounded-full flex items-center justify-center text-white shadow-md">
            <ChatsCircle size={40} weight="fill" />
          </div>

          {/* Judul: mt-6 text-3xl - SAMA KAYAK REGISTER */}
          <h1 className="mt-6 text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Welcome to READTalk
          </h1>

          {/* Deskripsi: mt-2 text-sm - SAMA KAYAK REGISTER */}
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-5">
            Read our <Link to="/privacy" className="text-[#FF0000] font-medium hover:underline">Privacy Policy</Link>. Tap "Agree and continue" to accept the <Link to="/tos" className="text-[#FF0000] font-medium hover:underline">Terms of Service</Link>.
          </p>

          {/* Dropdown: mt-4 */}
          <div className="mt-4 w-full">
            <div className="relative">
              <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <select className="w-full appearance-none rounded-lg border-neutral-200 dark:border-zinc-700 bg-neutral-50 dark:bg-zinc-800 px-10 py-2 text-sm text-neutral-700 dark:text-neutral-200 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000]">
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
              </select>
              <CaretDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Tombol: mt-6 w-full py-2 px-3 - SAMA KAYAK REGISTER */}
          <Link
            to="/register"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[#FF0000] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#CC0000] active:scale-[0.98]"
          >
            Agree and continue
          </Link>
        </div>
      </div>
    </div>
  );
}
