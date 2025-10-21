"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";

const categories = ["All Projects", "Internship Projects", "Research Projects"];

const projects = [
  { title: "Digital Stethoscope", subtitle: "Visual Observation Heart Sounds", image: "/images/thumbnail.png", category: "Research Projects" },
  { title: "SiHEDAF", subtitle: "Atrial Fibrillation Detector", image: "/images/thumbnail.png", category: "Research Projects" },
  { title: "Antropometri Kit", subtitle: "Observations of Weight, Height, Head Circumference...", image: "/images/thumbnail.png", category: "Internship Projects" },
  { title: "AMons", subtitle: "Arrhythmia Monitoring System", image: "/images/thumbnail.png", category: "Research Projects" },
  { title: "Digital Stethoscope", subtitle: "Visual Observation Heart Sounds", image: "/images/thumbnail.png", category: "Research Projects" },
  { title: "SiHEDAF", subtitle: "Atrial Fibrillation Detector", image: "/images/thumbnail.png", category: "Research Projects" },
  { title: "Antropometri Kit", subtitle: "Observations of Weight, Height, Head Circumference...", image: "/images/thumbnail.png", category: "Internship Projects" },
  { title: "AMons", subtitle: "Arrhythmia Monitoring System", image: "/images/thumbnail.png", category: "Research Projects" },
];

export default function ProjectsSection() {
  const [selected, setSelected] = useState("All Projects");

  const filtered =
    selected === "All Projects"
      ? projects
      : projects.filter((p) => p.category === selected);

  return (
    <section id="projects" className="py-20 bg-gray-50 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Explore All Projects
      </h2>

      {/* Tabs pakai Button */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setSelected(cat)}
            variant={selected === cat ? "primary" : "outline"}
            className={`rounded-full text-sm font-medium shadow-sm ${
              selected === cat
                ? "shadow-md"
                : "bg-white text-gray-800 hover:bg-gray-100 border-none"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Grid of cards */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full px-6">
        {filtered.map((p, i) => (
          <Card
            key={i}
            title={p.title}
            subtitle={p.subtitle}
            image={p.image}
            category={p.category}
            href={`/catalog/${p.title.toLowerCase().replace(/\s+/g, "-")}`} // contoh link ke detail
          />
        ))}
      </div>

      {/* See more button */}
      <Button
        variant="primary"
        dropdownItems={[
          { label: "Research Project", href: "/catalog/research" },
          { label: "Internship Project", href: "/catalog/internship" },
        ]}
        className="mt-10 px-6 py-2"
      >
        See More Projects
      </Button>
    </section>
  );
}