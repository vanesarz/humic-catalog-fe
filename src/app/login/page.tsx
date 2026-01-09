"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [remember, setRemember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // load remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://catalog-api.humicprototyping.net/api/login",
        // "http://localhost:8000/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Email atau password salah.");
      }

      // SIMPAN TOKEN DI COOKIE → biar middleware bisa baca
      setCookie("token", data.token, {
        path: "/",
        maxAge: remember ? 60 * 60 * 24 * 7 : undefined, // 7 hari kalo remember
      });

      // simpan di localStorage (opsional)
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      // remember email
      if (remember) {
        localStorage.setItem("rememberEmail", form.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan.";
      alert(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-black text-center text-gray-900 mb-3">
          Login
        </h1>

        <hr className="place-self-center w-20 border-3 border-red-800 mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-base text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="admin@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 my-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-base text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 my-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center justify-between">
            <label className="text-base text-gray-700 flex items-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2 accent-gray-700"
              />
              Remember me
            </label>
          </div>

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login to Admin Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}