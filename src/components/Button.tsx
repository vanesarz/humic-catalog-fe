"use client";

import React from "react";
import Link from "next/link";

interface DropdownItem {
  label: string;
  href: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "outline" | "link";
  dropdownItems?: DropdownItem[];
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  href,
  dropdownItems,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-colors duration-200 relative";

  const variants = {
    primary: "px-5 py-2 rounded-lg bg-[#B4252A] text-white hover:bg-[#991f23]",
    outline:
      "px-5 py-2 rounded-lg border border-[#B4252A] text-[#B4252A] hover:bg-[#B4252A]/10 hover:text-[#991f23]",
    link: "text-gray-800 hover:text-[#B4252A]", // gaya navbar
  };

  const combined = `${baseStyles} ${variants[variant]} ${className}`;

  // === CASE 1: Dropdown ===
  if (dropdownItems && dropdownItems.length > 0) {
    return (
      <div className="relative group">
        {/* Tombol utama */}
        <button className={combined} {...props}>
          {children}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        <div
          className="absolute left-0 mt-2 bg-white shadow-lg rounded-xl opacity-0 
          group-hover:opacity-100 group-hover:translate-y-0 translate-y-2
          transition-all duration-300 invisible group-hover:visible z-50
          min-w-[var(--button-width)] w-max"
          style={{ minWidth: "max(100%, 10rem)" }}
        >
          {dropdownItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // === CASE 2: Link biasa ===
  if (href) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  // === CASE 3: Button biasa ===
  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
};

export default Button;