"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Navbar, Footer } from "@/components";


export default function DeveloperPage() {
  const developers = [
    {
      name: "Soraya Haidar Salma",
      role: "UI/UX Designer",
      img: "/images/soraya.png", 
      linkedin: "https://www.linkedin.com/in/sorayahaidars",
      username: "sorayahaidars",
    },
    {
      name: "Vanesa Rizka Alfatihah",
      role: "Front-end Developer",
      img: "/images/vanesa.jpg", 
      linkedin: "https://www.linkedin.com/in/vanesarz",
      username: "vanesarz",
    },
    {
      name: "M Hafid Sukarno",
      role: "Back-end Developer",
      img: "/images/hafid.png", 
      linkedin: "https://www.linkedin.com/in/hafidsukarno",
      username: "hafidsukarno",
    },
  ];

  return (
    <section>
      <Navbar />
      <section className="min-h-screen bg-gray-50 flex flex-col items-center py-20">
        {/* Judul utama */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 relative inline-block">
            Our Developer
            <span className="absolute left-0 bottom-0 w-full h-1 bg-[#B4252A] rounded-md mt-1"></span>
          </h2>
        </div>

        {/* Subjudul */}
        <p className="text-lg font-semibold mb-14 text-gray-800 text-center">
          HUMiC Engineering Internship Batch 5
        </p>

        {/* Kartu developer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="w-52 h-64 mb-5">
                <Image
                  src={dev.img}
                  alt={dev.name}
                  width={208}
                  height={256}
                  className="rounded-xl object-cover w-full h-full"
                />
              </div>

              <h3 className="text-lg font-semibold text-black text-center">
                {dev.name}
              </h3>
              <p className="text-[#B4252A] font-semibold mb-3 text-center">
                {dev.role}
              </p>

              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-[#B4252A] transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span>{dev.username}</span>
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </section>
  );
}