"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "https://catalog-api.humicprototyping.net/api/public/products"
        );
        const data = await res.json();
        setProjects(data?.data || []); // asumsi API Laravel pakai resource collection
      } catch (err) {
        console.error("error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filtered =
    selected === "All Projects"
      ? projects
      : projects.filter((p) => p.category === selected);

  return (
    <section className="py-16 bg-gray-50 flex flex-col items-center">
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

      {/* Loading state */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full px-6">
          {filtered.length > 0 ? (
            filtered.map((p) => (
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
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No projects found.
            </p>
          )}
        </div>
      )}

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