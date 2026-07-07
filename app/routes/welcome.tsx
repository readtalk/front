// app/routes/welcome.tsx
import { Link } from "react-router";

export default function Welcome() {
    return (
        <div className="flex min-h-screen flex-col justify-between bg-white">
            {/* BAGIAN ATAS: Logo + Teks + Dropdown */}
            <div className="flex flex-col items-center px-6 pt-12">
                {/* Logo */}
                <div className="w-20 h-20 bg-[#FF0000] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    RT
                </div>

                {/* Judul */}
                <h1 className="mt-6 text-2xl font-bold text-neutral-900 text-center">
                    Welcome to READTalk
                </h1>

                {/* Deskripsi */}
                <p className="mt-2 text-sm text-neutral-500 text-center max-w-xs">
                    Read our Privacy Policies. Tap "Agree and continue" to accept our Terms of Service.
                </p>

                {/* Dropdown Bahasa (opsional, seperti di WhatsApp) */}
                <div className="mt-4 w-full max-w-xs">
                    <select className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-sm text-neutral-700 focus:border-[#FF0000] focus:outline-none">
                        <option value="en">English</option>
                        <option value="id">Indonesia</option>
                        {/* Tambah bahasa lain sesuai kebutuhan */}
                    </select>
                </div>
            </div>

            {/* BAGIAN BAWAH: Tombol */}
            <div className="w-full px-6 pb-10">
                <Link
                    to="/register"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[#FF0000] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#CC0000] active:scale-[0.98]"
                >
                    Agree and continue
                </Link>
            </div>
        </div>
    );
}
