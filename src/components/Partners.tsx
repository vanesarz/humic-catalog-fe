"use client";
import Link from "next/link";
import Image from "next/image";

const partners = [
  "/len.png", "/ipb.png", "/inti.png", "/tni.png",
  "/rssa.png", "/itb.png", "/fkub.png", "/rsud.png",
  "/rs.png", "/unpad.png", "/ugm.png"
];

export default function Partners() {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-2xl font-bold mb-10">Our Partners</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {partners.map((logo, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex items-center justify-center">
            <Link href="/" className="max-h-16">
            <Image
                src="/logo-humic-3.png"
                alt="partner"
                width={40} 
                height={40}
                priority 
            />
            </Link>

          </div>
        ))}
      </div>
    </section>
  );
}