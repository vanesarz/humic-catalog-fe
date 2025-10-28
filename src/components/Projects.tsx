"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const highlightProjects = [
    {
      title: "Digital Stethoscope",
      description:
        "A digital stethoscope is an innovative tool used to visually observe heart sounds without the need to rely on the sense of hearing. It focuses on utilizing sound signals specifically to detect heart valve disease.",
    },
    {
      title: "Antropometri Kit",
      description:
        "A toolkit used for accurate body measurement to support health research and ergonomic design applications.",
    },
    {
      title: "AMons",
      description:
        "A smart monitoring system that tracks environmental data in real time to support sustainable development initiatives.",
    },
    {
      title: "SiHedaf",
      description:
        "A digital platform designed to help identify, monitor, and prevent heart diseases using data-driven insights.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % highlightProjects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + highlightProjects.length) % highlightProjects.length);
  };

  return (
    <section id="projects">
      {/* === Bagian Get to Know Our Projects === */}
      <section className="flex flex-col items-center text-center px-6 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">Get to Know Our Projects</h2>
        <p className="text-gray-700 max-w-2xl mb-8">
          Below are some of the research and internship focuses that become the
          main topics of discussion in CoE HUMIC Engineering
        </p>

        {/* Navigation & Tabs */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex flex-wrap justify-center gap-3">
            {highlightProjects.map((project, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`px-4 py-2 rounded-full font-medium shadow-sm transition ${
                  activeIndex === index
                    ? "bg-red-700 text-white shadow-md"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Description Box */}
        <div className="bg-gray-100 shadow-md rounded-2xl px-6 py-6 max-w-2xl">
          <p className="text-gray-800 leading-relaxed">
            {highlightProjects[activeIndex].description}
          </p>
        </div>

        <hr className="place-self-center w-6xl border-1 border-gray-200 mt-20"/>
      </section>

      {/* === Bagian Explore All Projects === */}
      <section id="projects" className="pb-20 bg-gray-50 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Explore All Projects
        </h2>

        {/* Tabs */}
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

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full px-6">
          {filtered.map((p, i) => (
            <Card
              key={i}
              title={p.title}
              subtitle={p.subtitle}
              image={p.image}
              category={p.category}
              href={`/catalog/${p.title.toLowerCase().replace(/\s+/g, "-")}`}
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
    </section>
  );
}