"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  href,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-5 py-2 rounded-full font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-[#B4252A] text-white hover:bg-[#991f23]",
    outline:
      "border border-[#B4252A] text-[#B4252A] hover:bg-[#B4252A]/10 hover:text-[#991f23]",
  };

  const combined = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    // langsung pakai Link + class
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
};

export default Button;