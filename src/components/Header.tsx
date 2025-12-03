"use client";
import Image from "next/image";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="relative w-screen text-center mb-10">
      {/* background image */}
      <div className="w-full h-[160px] overflow-hidden">
        <Image
          src="/header.png"
          alt="Header"
          width={208}
          height={256}
          className="object-cover w-full h-full"
        />
      </div>

      {/* title overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          {title}
        </h2>
        <span className="mt-2 w-40 h-1 bg-[#B4252A] rounded-md"></span>
      </div>
    </div>
  );
}