"use client";
import Link from "next/link";
import Image from "next/image";

const partners = [
  "/partners/partner-1.png", "/partners/partner-2.png", "/partners/partner-3.png", 
  "/partners/partner-4.png", "/partners/partner-5.png", "/partners/partner-6.png", 
  "/partners/partner-7.png", "/partners/partner-8.png", "/partners/partner-9.png", 
  "/partners/partner-10.png", 
];

export default function Partners() {
  return (
    <section id="partners" className="py-16 bg-gray-100 text-center">
      <p className="text-lg md:text-3xl font-bold text-center text-gray-900">
        Our Partners
      </p>
      <hr className="w-40 border-2 border-red-800 mt-3 mb-6 mx-auto" />
      
      <div className="flex flex-wrap justify-center gap-3">
        {partners.map((logo, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex items-center justify-center"
          >
            <Link href="/" className="max-h-16 flex items-center justify-center">
              <Image
                src={logo}
                alt={`partner-${i}`}
                width={60}
                height={60}
                priority
                className="max-w-[60px] max-h-[60px] w-auto h-auto object-contain"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}