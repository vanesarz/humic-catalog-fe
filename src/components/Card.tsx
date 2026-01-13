"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  image: string;
  category?: string;
  href?: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, category, href }) => {
  const cardContent = (
    <div className="h-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Thumbnail */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        <div className="w-full h-full rounded-0 overflow-hidden relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
          />
        </div>
      </div>

      {/* Text content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
        {category && <p className="text-xs text-gray-400 mt-2">{category}</p>}
      </div>
    </div>
  );

  // kalau ada href, bungkus pakai Link
  return href ? (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default Card;