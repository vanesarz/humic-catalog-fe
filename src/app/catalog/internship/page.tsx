"use client";

import { useState, useEffect } from "react";
import { Card, Header } from "@/components";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ApiProduct {
  title?: string;
  description?: string;
  thumbnail_path?: string;
  slug: string;
  category?: string;
}

interface Product {
  title: string;
  subtitle: string;
  image: string;
  category: string;
  slug: string;
}

export default function InternshipCatalog() {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://catalog-api.humicprototyping.net/api/public/products?category=Internship Project"
        );
        const data = await res.json();

        if (!Array.isArray(data?.data)) {
          console.error("Invalid API response", data);
          setProducts([]);
          return;
        }

        const formatted: Product[] = (data.data as ApiProduct[]).map((item) => ({
          title: item.title || "Untitled",
          subtitle: item.description || "",
          // fallback untuk thumbnail, pastikan absolute URL
          image: item.thumbnail_path
            ? item.thumbnail_path.startsWith("http")
              ? item.thumbnail_path
              : `https://catalog-api.humicprototyping.net/${item.thumbnail_path}`
            : "/images/thumbnail.png",
          slug: item.slug,
          category: item.category || "Internship Project",
        }));

        setProducts(formatted);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <section className="min-h-screen w-screen flex items-center justify-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="min-h-screen w-screen bg-gray-50 flex flex-col items-center mt-14">
      <Header title="Internship Projects" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full px-6">
        {currentItems.map((p, i) => (
          <Card
            key={p.slug || `product-${i}`} // fallback key kalau slug kosong/duplikat
            title={p.title}
            subtitle={p.subtitle}
            image={p.image}
            category={p.category}
            href={`/catalog/research/${p.slug}`}
          />
        ))}
      </div>

      <div className="flex items-center justify-center my-8 gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`p-2 rounded-md shadow-md transition ${
            page === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"
          }`}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`w-8 h-8 rounded-md text-sm font-medium shadow-sm transition ${
              num === page
                ? "bg-red-700 text-white shadow-md"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`p-2 rounded-md shadow-md transition ${
            page === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"
          }`}
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
}