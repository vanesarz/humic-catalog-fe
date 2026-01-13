"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Header } from "@/components";
import { BookOpen } from "lucide-react";

interface ApiProductRaw {
  title?: string;
  description?: string;
  thumbnail_path?: string;
  category?: string;
  user_manual?: string;
  file_url?: string;
  file_path?: string;
}

interface ApiProduct {
  title?: string;
  description?: string;
  thumbnail_path?: string;
  category?: string;
  user_manual?: string;
  file_url?: string;
  file_path?: string;
  slug: string;
  url?: string;
}

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [project, setProject] = useState<ApiProduct | null>(null);
  const [projects, setProjects] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ambil project by slug
        const res = await fetch(
          `https://catalog-api.humicprototyping.net/api/public/products/${slug}`
        );
        const json = await res.json();

        if (!json?.data) throw new Error("project not found");

        const slugify = (text: string) =>text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

        // inject slug manual
        const projectData = {
          ...json.data,
          slug: slugify(json.data.title || "project"),
        };

        setProject(projectData);

        // ambil semua project buat sidebar
        const resAll = await fetch(
          "https://catalog-api.humicprototyping.net/api/public/products"
        );
        const jsonAll = await resAll.json();

        if (Array.isArray(jsonAll?.data)) {
          const fixed: ApiProduct[] = (jsonAll.data as ApiProductRaw[]).map((p) => ({
            ...p,
            slug: slugify(p.title || "project"),
          }));

          setProjects(
            fixed.filter(
              (p) => p.slug !== slugify(json.data.title || "project")
            )
          );
        }

        console.log("ALL PRODUCTS:", jsonAll.data[0]);

      } catch (err) {
        setError(err instanceof Error ? err.message : "failed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        loading...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error || "project not found"}</p>
      </div>
    );
  }

  const imageUrl = project.thumbnail_path
    ? project.thumbnail_path.startsWith("http")
      ? project.thumbnail_path
      : `https://catalog-api.humicprototyping.net/storage/${project.thumbnail_path}`
    : "/images/thumbnail.png";

  return (
    <section className="min-h-screen w-full bg-gray-100 pt-16 mb-10">
      <Header title={project.title || "Project Detail"} />

      <div className="max-w-7xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* MAIN CARD */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="relative w-full h-[360px] flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={project.title || ""}
              width={400}
              height={400}
              className="object-contain w-full h-full rounded-lg"
            />
          </div>

          <div className="p-8">
            <h1 className="text-2xl font-bold text-red-700 mb-2">
              {project.title}
            </h1>

            <p className="text-sm mb-3">
              <span className="font-semibold">Category :</span>{" "}
              {project.category || "-"}
            </p>

            <p className="text-sm mb-4">
              <span className="font-semibold">Description :</span>{" "}
              {project.description || "-"}
            </p>

            {project.user_manual && (
              <p className="text-sm mb-2">
                <span className="font-semibold">User Manual :</span>{" "}
                <Link
                  href={project.user_manual}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {project.user_manual}
                </Link>
              </p>
            )}

            {project.file_url && (
              <p className="text-sm mb-6">
                <span className="font-semibold">Project Link :</span>{" "}
                <Link
                  href={project.file_url}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {project.file_url}
                </Link>
              </p>
            )}

            {project.file_path && (
              <div className="grid justify-stretch gap-2 pt-4 w-full place-self-center">
                <Button
                  variant="primary"
                  onClick={() =>
                    window.open(
                      `https://catalog-api.humicprototyping.net/storage/${project.file_path}`,
                      "_blank"
                    )
                  }
                >
                  <BookOpen className="w-5 h-5 mr-3" strokeWidth={2} />
                  Open Project
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* OTHER PROJECTS */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-lg font-bold border-b-2 border-red-800 pb-2 mb-4">
            Other Projects
          </h3>

          <div className="flex flex-col gap-4">
            {projects.slice(0, 5).map((p) => {
              const thumb = p.thumbnail_path
                ? p.thumbnail_path.startsWith("http")
                  ? p.thumbnail_path
                  : `https://catalog-api.humicprototyping.net/storage/${p.thumbnail_path}`
                : "/images/thumbnail.png";

              return (
                <Link
                  key={p.slug}
                  href={`/catalog/${p.slug}`}
                  className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden">
                    <Image
                      src={thumb}
                      alt={p.title || ""}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">
                      {p.title || "Project"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {p.category || ""}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}