"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Header } from "@/components";

interface ApiProduct {
  title?: string;
  description?: string;
  thumbnail_path?: string;
  slug: string;
  category?: string;
  file_path?: string;
  user_manual?: string;
  file_url?: string;
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [project, setProject] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectBySlug = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://catalog-api.humicprototyping.net/api/public/products"
        );

        const data = await res.json();

        if (!Array.isArray(data?.data)) {
          throw new Error("Invalid API response");
        }

        const projectFound = (data.data as ApiProduct[]).find(
          (item) => item.slug === slug
        );

        if (!projectFound) throw new Error("Project not found");

        setProject(projectFound);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectBySlug();
  }, [slug]);

  if (loading) {
    return (
      <section className="min-h-screen w-screen flex items-center justify-center">
        Loading...
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="min-h-screen w-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <p className="mb-4 text-gray-700">{error || "Project not found."}</p>
          <Link href="/catalog">
            <Button variant="primary">Back to Projects</Button>
          </Link>
        </div>
      </section>
    );
  }

  const imageUrl = project.thumbnail_path
    ? project.thumbnail_path.startsWith("http")
      ? project.thumbnail_path
      : `https://catalog-api.humicprototyping.net/${project.thumbnail_path}`
    : "/images/thumbnail.png";

  return (
    <section className="min-h-screen w-screen bg-gray-50 flex flex-col items-center mt-14">
      <Header title={project.title || "Project Detail"} />

      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-6 mt-6 px-6">
        <div className="flex-1 bg-white shadow-sm rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col gap-6">
            <div className="w-full bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={project.title || "Project Image"}
                width={800}
                height={400}
                className="rounded-xl object-cover w-full h-80"
              />
            </div>

            <div className="text-gray-800">
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                {project.title}
              </h2>

              <p className="text-sm font-semibold mb-2">
                Category:{" "}
                <span className="font-normal text-gray-700">
                  {project.category || "N/A"}
                </span>
              </p>

              <p className="text-sm font-semibold mb-2">
                Description:{" "}
                <span className="font-normal text-gray-700">
                  {project.description || "-"}
                </span>
              </p>

              {project.user_manual && (
                <p className="text-sm font-semibold mb-2">
                  User Manual:{" "}
                  <Link
                    href={project.user_manual}
                    target="_blank"
                    className="font-normal text-blue-600 underline hover:text-blue-800"
                  >
                    {project.user_manual}
                  </Link>
                </p>
              )}

              {project.file_url && (
                <p className="text-sm font-semibold mb-4">
                  Project Link:{" "}
                  <Link
                    href={project.file_url}
                    target="_blank"
                    className="font-normal text-blue-600 underline hover:text-blue-800"
                  >
                    {project.file_url}
                  </Link>
                </p>
              )}

              <Button variant="primary" className="w-full">
                Open Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}