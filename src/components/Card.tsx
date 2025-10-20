"use client";

import Image from "next/image";

interface CardProps {
  name: string;
  image: string;
  location: string;
  rating: number; // 0–5
}

export default function Card({ name, image, location }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-60">
      {/* gambar */}
      <Image
        src={image}
        alt={name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />

      {/* isi card */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
}