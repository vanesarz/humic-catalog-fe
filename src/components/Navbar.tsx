"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";

export default function Navbar() {
  return (
    <nav className="w-full py-0 overflow-show bg-white shadow-lg fixed top-0 z-50">
      <div className="mx-auto my-0 py-2 flex items-center justify-around">
        {/* Logo */}
        <Link href="/" className="flex">
          <Image
            src="/logo-humic-text.png"
            alt="Logo Humic"
            width={151}
            height={63}
            priority
          />
        </Link>



        {/* Menu */}
        <div className="hidden md:flex gap-12 items-center relative">
          <Button variant="link" href="/">Home</Button>

          <Button
            variant="link"
            dropdownItems={[
              { label: "Research Project", href: "/catalog/research" },
              { label: "Internship Project", href: "/catalog/internship" },
            ]}
          >
            Catalog
          </Button>

          <Button variant="link" href="/?scrollTo=partners">Partners</Button>
        </div>

        {/* Contact Us Button */}
        <Button href="/?scrollTo=footer" className="p-6 font-bold">
          Contact Us
        </Button>

      </div>
    </nav>
  );
}