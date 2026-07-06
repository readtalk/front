// app/routes/_index.tsx //
import { Link } from "react-router";

export default function Index() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-white dark:bg-gray-950 p-6">
            {/* Spacer */}
            <div className="flex-1" />

            {/* Logo & Brand */}
            <div className="text-center">
                <div className="text-7xl mb-4">💬</div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    READTalk
                </h1>
            </div>

            {/* Tombol Agree and Continue */}
            <div className="w-full max-w-md mt-8">
                <Link
                    to="/register"
                    className="block w-full bg-[#ff0000] hover:bg-[#cc0000] text-white font-semibold py-3 rounded-full transition text-center"
                >
                    Agree and continue
                </Link>
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
                    Dengan melanjutkan, Anda menyetujui <br />
                    <span className="text-[#ff0000]">Syarat & Ketentuan</span> dan 
                    <span className="text-[#ff0000]"> Kebijakan Privasi</span>
                </p>
            </div>

            {/* Footer */}
            <div className="flex-1" />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                © 2026 SOEPARNO ENTERPRISE Corp.
            </p>
        </div>
    );
}
