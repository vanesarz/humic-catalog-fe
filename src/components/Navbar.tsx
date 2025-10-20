"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";

export default function Navbar() {
  return (
    <nav className="w-full py-20 justify-content-center overflow-hidden bg-white shadow-sm fixed top-0 z-50 scroll-hidden">
      <div className="mx-auto my-50 flex items-center justify-around">

        {/* Logo */}
        <Link href="/" className="flex">
          <Image
            src="/logo-humic-3.png"
            alt="Logo Humic"
            width={151} 
            height={63}
            priority 
          />
        </Link>

        {/* Menu */}
        <div className="hidden md:flex gap-12">
          <Link href="/" className="link">Home</Link>
          <Link href="/catalog" className="link">Catalog</Link>
          <Link href="/partners" className="link">Partners</Link>
        </div>

        {/* Contact Us Button */}
        <Button href="/contact" className="p-6">Contact Us</Button>
      </div>
    </nav>
  );
}