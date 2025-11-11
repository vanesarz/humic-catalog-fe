"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  FlaskConical,
  Users,
  UserCircle,
} from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

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
    {
      name: "Profile",
      href: "/admin/profile",
      icon: <UserCircle className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col py-6">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 mb-6">
        <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center">
          <Image
            src="/logo-humic-1.png"
            alt="Humic Logo"
            width={28}
            height={28}
            className="object-contain"
          />
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
    </aside>
  );
}