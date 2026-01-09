"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Partner {
  id: number;
  name: string;
  logo_path: string | null;
  website_url: string | null;
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch(
          "https://catalog-api.humicprototyping.net/api/public/partners"
        );
        const json = await res.json();

        setPartners(json.data || []);
      } catch (err) {
        console.error("failed to fetch partners", err);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section id="partners" className="py-16 bg-gray-100 text-center">
      <p className="text-lg md:text-3xl font-bold text-gray-900">
        Our Partners
      </p>
      <hr className="w-40 border-2 border-red-800 mt-3 mb-6 mx-auto" />

      {loading ? (
        <p className="text-gray-500 text-sm">Loading partners...</p>
      ) : partners.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-3">
          {partners.map((p, index) => {
            const logo = p.logo_path
              ? `https://catalog-api.humicprototyping.net/storage/${p.logo_path}`
              : "/partners/default.png";

            return (
              <div
                key={`${p.id}-${index}`}
                className="relative group bg-white p-4 rounded-lg shadow-md w-24 h-24 flex items-center justify-center hover:shadow-lg transition overflow-hidden"
              >
                {/* Logo */}
                {p.website_url ? (
                  <Link
                    href={p.website_url}
                    target="_blank"
                    className="flex items-center justify-center w-full h-full z-10"
                  >
                    <Image
                      src={logo}
                      alt={p.name || "partner"}
                      width={60}
                      height={60}
                      className="max-w-[60px] max-h-[60px] w-auto h-auto object-contain"
                    />
                  </Link>
                ) : (
                  <Image
                    src={logo}
                    alt={p.name || "partner"}
                    width={60}
                    height={60}
                    className="max-w-[60px] max-h-[60px] w-auto h-auto object-contain z-10"
                  />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <p className="text-white text-xs font-medium text-center px-2">
                    {p.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No partners found.</p>
      )}
    </section>
  );
}