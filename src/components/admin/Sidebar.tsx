"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Briefcase,
  FlaskConical,
  Users,
  UserCircle,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { deleteCookie } from "cookies-next";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [adminState, setAdminState] = useState<{ name?: string; email?: string } | null>(null);

  // ambil admin dari localStorage setelah component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) setAdminState(JSON.parse(storedAdmin));
    }
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "Internship Catalog",
      href: "/admin/internship",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      name: "Research Catalog",
      href: "/admin/research",
      icon: <FlaskConical className="w-5 h-5" />,
    },
    {
      name: "Partners",
      href: "/admin/partners",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  // close dropdown kalo klik di luar area dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    router.push("/login");
  };

  const initials = adminState?.name
    ? adminState.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "AD";

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col py-6 relative">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 mb-6">
        <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-semibold text-gray-800 text-sm">Catalog Admin</h1>
          <p className="text-xs text-gray-500">CoE Humic Engineering</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="text-xs uppercase text-gray-400 font-medium mb-2 px-2">
          Navigation
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span
                className={`${
                  isActive ? "text-gray-900" : "text-gray-600"
                } transition-colors`}
              >
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* USER BUTTON */}
      <div className="relative px-4 mt-auto" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center gap-3 bg-red-50 hover:bg-red-100 transition p-3 rounded-xl shadow-sm border border-red-100"
        >
          <div className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center font-bold">
            {initials}
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-gray-800">
              {adminState?.name || "Admin User"}
            </p>
            <p className="text-xs text-gray-500">
              {adminState?.email || "admin@gmail.com"}
            </p>
          </div>
          <ChevronUp
            className={`w-4 h-4 text-gray-600 transition ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* DROPDOWN MENU */}
        {dropdownOpen && (
          <div className="absolute left-4 right-4 bottom-20 bg-white shadow-xl border border-gray-200 rounded-xl py-3 z-40">
            <div className="px-4 pb-3 border-b border-gray-200">
              <p className="font-semibold text-gray-900 text-sm">{adminState?.name || "Admin User"}</p>
              <p className="text-xs text-gray-500">{adminState?.email || "admin@gmail.com"}</p>
            </div>

            <Link
              href="/admin/profile"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700"
            >
              <UserCircle className="w-5 h-5 text-gray-600" />
              Profile Settings
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}