// app/routes/welcome.tsx
import { Link } from "react-router";

export default function Welcome() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="max-w-md text-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to READTalk</h1>
                <p className="text-gray-600 mb-8">
                    A modern chat application for teams and communities.
                </p>
                <Link
                    to="/register"
                    className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-700 transition"
                >
                    Agree and continue
                </Link>
            </div>
        </div>
    );
}
