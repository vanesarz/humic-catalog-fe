"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All Projects", "Internship Project", "Research Project"];

type Project = {
  id: number;
  title: string;
  slug: string;
  subtitle?: string | null;
  category: "Research Project" | "Internship Project";
  description?: string | null;
  file_path?: string | null;
  thumbnail_path?: string | null;
  admin_id: number;
  created_at?: string;
  updated_at?: string;
};

export default function ProjectsSection() {
  const [selected, setSelected] = useState("All Projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const itemsPerPage = 8;
  const highlightCount = 5; // jumlah project terbaru untuk highlight

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        let url = "https://catalog-api.humicprototyping.net/api/public/products";

        if (selected === "Research Project") url += "?category=Research Project";
        else if (selected === "Internship Project") url += "?category=Internship Project";

        const res = await fetch(url);
        const data = await res.json();

        const fetched: Project[] = (data?.data || []).map((p: Project) => ({
          ...p,
          slug:
            p.slug ||
            p.title
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, ""),
        }));

        // sort berdasarkan created_at terbaru dulu
        fetched.sort(
          (a, b) =>
            new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
        );

        setProjects(fetched.slice(0, itemsPerPage));
      } catch (err) {
        console.error("error fetching projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selected]);

  const filtered = projects;

  // highlight projects: 5 terbaru dari semua kategori
  const highlightProjects = projects.slice(0, highlightCount);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % highlightProjects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + highlightProjects.length) % highlightProjects.length);
  };

  return (
    <section id="projects">
      {/* === Get to Know Our Projects === */}
      <section className="flex flex-col items-center text-center px-6 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">Get to Know Our Projects</h2>
        <p className="text-gray-700 max-w-2xl mb-8">
          Here are some of the latest research and internship projects in CoE HUMIC Engineering
        </p>

        {highlightProjects.length > 0 && (
          <>
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
                    key={project.id}
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

            <div className="bg-gray-100 shadow-md rounded-2xl px-6 py-6 max-w-2xl">
              <p className="text-gray-800 leading-relaxed">
                {highlightProjects[activeIndex].description || "No description available."}
              </p>
            </div>
          </>
        )}
      </section>

      {/* === Explore All Projects === */}
      <section id="explore-projects" className="pb-20 bg-gray-50 flex flex-col items-center">
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

        {loading ? (
          <p className="text-gray-500 text-sm">Loading projects...</p>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full px-6">
            {filtered.map((p) => (
              <Card
                key={p.id}
                title={p.title}
                subtitle={p.subtitle || ""}
                image={
                  p.thumbnail_path
                    ? `https://catalog-api.humicprototyping.net/storage/${p.thumbnail_path}`
                    : "/images/thumbnail.png"
                }
                category={p.category}
                href={`/catalog/${p.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">No projects found.</p>
        )}

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