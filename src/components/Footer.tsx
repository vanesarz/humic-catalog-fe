"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#16171D] text-gray-300 py-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[70%_15%_15%] gap-10">
        {/* === Left: Logo & Address === */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo-humic-1.png"
              alt="HUMIC Engineering Logo"
              width={50}
              height={50}
            />
            <div>
              <h3 className="text-lg font-semibold text-white leading-tight">
                HUMiC
              </h3>
              <p className="text-sm text-gray-300 -mt-1">Engineering</p>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <p className="font-semibold text-white">
              Gedung Kultubai Selatan, Gedung F
            </p>
            <p>Jl. Telekomunikasi, Terusan Buah Batu Bandung</p>
            <p>Jawa Barat, Indonesia. 40257</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <Link
              href="https://www.instagram.com/humicengineering"
              target="_blank"
              className="border border-gray-400 rounded-full p-2 hover:bg-gray-700 transition"
            >
              <Instagram className="w-5 h-5 text-white" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/humic-engineering/about"
              target="_blank"
              className="border border-gray-400 rounded-full p-2 hover:bg-gray-700 transition"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </Link>
            <Link
              href="mailto:info@humic.com"
              className="border border-gray-400 rounded-full p-2 hover:bg-gray-700 transition"
            >
              <Mail className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>

        {/* === Middle: Navigation === */}
        <div className="flex flex-col md:items-start">
          <h4 className="text-white font-semibold text-lg mb-4">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" className="hover:text-white transition">
                Catalog
              </Link>
              <ul className="ml-4 mt-1 space-y-1 text-sm">
                <li>
                  <Link
                    href="/catalog/research"
                    className="hover:text-white transition"
                  >
                    Research
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalog/internship"
                    className="hover:text-white transition"
                  >
                    Internship
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/?scrollTo=partners" className="hover:text-white transition">
                Partners
              </Link>
            </li>
          </ul>
        </div>

        {/* === Right: Others === */}
        <div className="flex flex-col md:items-start">
          <h4 className="text-white font-semibold text-lg mb-4">Others</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/?scrollTo=about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/developer" className="hover:text-white transition">
                Developer
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* === Bottom Border & Copyright === */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-500 pt-6 text-center text-sm text-gray-400">
        © 2025 <span className="font-semibold text-white">CoE HUMIC Engineering</span>
      </div>
    </footer>
  );
}