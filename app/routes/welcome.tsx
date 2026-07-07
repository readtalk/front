import { useState } from "react";
import { Link } from "react-router-dom";

interface RegisterCredentials { email: string; password: string; firstName: string; lastName: string; avatar?: string | null; }
interface AuthResponse { success: boolean; message?: string; user: { id: string; email: string; first_name: string; last_name: string; avatar: string | null; }; session: { id: string; expires_at: number; }; }

export default function Register() {
  const [credentials, setCredentials] = useState<RegisterCredentials>({ email: "", password: "", firstName: "", lastName: "", avatar: null });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("https://api.readtalk.workers.dev/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(credentials) });
      const data: AuthResponse = await response.json();
      if (!data.success) { setError(data.message || "Registration failed"); return; }
      localStorage.setItem("session", data.session.id);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/channel/0";
    } catch (error) { setError("Failed to register"); console.error("Registration error:", error); }
    finally { setIsLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({...prev, [name]: value }));
  };

  return (
    // INI KUNCINYA: min-h-screen flex items-center justify-center
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-zinc-950 px-4">

      {/* INI KUNCINYA LAGI: w-full max-w-[420px] p-8 */}
      <div className="w-full max-w-[420px] rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-sm">

        <div className="mb-8">
          <h3 className="text-center text-3xl font-bold tracking-tight text-black dark:text-white"> {/* text-3xl dari kode lu */}
            READTalk Messenger
          </h3>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400"> {/* text-sm dari kode lu */}
            © 2026 SOEPARNO ENTERPRISE Corp.
          </p>
        </div>

        {/* space-y-4 dari kode lu */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300"> Email Address </label>
            <input id="email" name="email" type="email" value={credentials.email} onChange={handleChange} required
              className="mt-1 block w-full rounded-md border-0 p-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF0000] sm:text-sm"
              placeholder="Enter your email" />
          </div>

          <div className="grid grid-cols-2 gap-4"> {/* biar first + last name sebelahan */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300"> First Name </label>
              <input id="firstName" name="firstName" type="text" value={credentials.firstName} onChange={handleChange} required
                className="mt-1 block w-full rounded-md border-0 p-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF0000] sm:text-sm"
                placeholder="First" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300"> Last Name </label>
              <input id="lastName" name="lastName" type="text" value={credentials.lastName} onChange={handleChange} required
                className="mt-1 block w-full rounded-md border-0 p-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF0000] sm:text-sm"
                placeholder="Last" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300"> Password </label>
            <input id="password" name="password" type="password" value={credentials.password} onChange={handleChange} required
              className="mt-1 block w-full rounded-md border-0 p-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF0000] sm:text-sm"
              placeholder="Create a password" />
          </div>

          {error && <div className="text-red-500 text-sm text-center pt-2"> {error} </div>}

          {/* py-2 px-3 dari kode lu */}
          <button type="submit" disabled={isLoading}
            className="mt-6 group relative flex w-full justify-center rounded-md bg-[#FF0000] px-3 py-2 text-sm font-semibold text-white hover:bg-[#CC0000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0000] disabled:opacity-50 active:scale-[0.98]"
          >
            {isLoading? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="font-medium text-[#FF0000] hover:text-[#CC0000]"> Sign in </Link>
        </div>
      </div>
    </div>
  );
}
