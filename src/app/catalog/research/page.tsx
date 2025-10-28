"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar, Footer } from "@/components";

const researchProjects = [
  { title: "Digital Stethoscope", subtitle: "Visual Observation Heart Sounds", image: "/images/thumbnail.png" },
  { title: "Antropometri Kit", subtitle: "Observations of Weight, Height, Head Circumference and Infant Nutrition by Age", image: "/images/thumbnail.png" },
  { title: "AMons", subtitle: "Arrhythmia Monitoring System", image: "/images/thumbnail.png" },
  { title: "SiHEDAF", subtitle: "Atrial Fibrillation Detector", image: "/images/thumbnail.png" },
  { title: "Project E", subtitle: "Subtitle E", image: "/images/thumbnail.png" },
  { title: "Project F", subtitle: "Subtitle F", image: "/images/thumbnail.png" },
  { title: "Project G", subtitle: "Subtitle G", image: "/images/thumbnail.png" },
  { title: "Project H", subtitle: "Subtitle H", image: "/images/thumbnail.png" },
  { title: "Project I", subtitle: "Subtitle I", image: "/images/thumbnail.png" },
  { title: "Project J", subtitle: "Subtitle J", image: "/images/thumbnail.png" },
  { title: "Project K", subtitle: "Subtitle K", image: "/images/thumbnail.png" },
  { title: "Project L", subtitle: "Subtitle L", image: "/images/thumbnail.png" },
  { title: "Project M", subtitle: "Subtitle M", image: "/images/thumbnail.png" },
  { title: "Project N", subtitle: "Subtitle N", image: "/images/thumbnail.png" },
  { title: "Project O", subtitle: "Subtitle O", image: "/images/thumbnail.png" },
  { title: "Project P", subtitle: "Subtitle P", image: "/images/thumbnail.png" },
];

export default function InternshipCatalog() {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(researchProjects.length / itemsPerPage);

  // ambil data sesuai halaman
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = researchProjects.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center py-16 mt-18">
      <Navbar />
      {/* ===== Header ===== */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Internship Projects
        </h1>
        <hr className="w-44 border-2 border-red-800 mt-3 mx-auto rounded-full" />
      </div>

      {/* ===== Cards Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full px-6">
        {currentItems.map((p, i) => (
          <Card
            key={i}
            title={p.title}
            subtitle={p.subtitle}
            image={p.image}
            category="Research Projects"
            href={`/catalog/internship/${p.title.toLowerCase().replace(/\s+/g, "-")}`}
          />
        ))}
      </div>

      {/* ===== Pagination ===== */}
      <div className="flex items-center justify-center mt-12 gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`p-2 rounded-md shadow-md transition ${
            page === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
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
            page === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      <Footer />
    </section>
  );
}