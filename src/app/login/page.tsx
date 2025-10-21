"use client";

import { useState } from "react";
import Button from '@/components/Button';

export default function LoginPage() {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // sementara console.log dulu, nanti bisa dikirim ke backend
    console.log("Login Data:", form);
    alert("Login successful!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-black text-center text-gray-900 mb-3">
          Login
        </h1>

        <hr className="place-self-center w-20 border-3 border-red-800 mb-6"/>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-base text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="admin@example.com"
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
            <label className="text-base text-gray-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2 accent-gray-700 mb-4 "
              />
              Remember me
            </label>
            {/* <a href="#" className="text-sm text-gray-600 hover:underline">
              Forgot password?
            </a> */}
          </div>

          <Button type="submit" href="/contact" className="w-full">Login to Admin Dashboard</Button>
        </form>
      </div>
    </div>
  );
}