"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Navbar, Footer } from "@/components";

const projects = [
  {
    slug: "digital-stethoscope",
    title: "Digital Stethoscope",
    category: "Research Project",
    description:
      "A digital stethoscope is an innovative tool used to visually observe heart sounds without the need to rely on the sense of hearing. It focuses on utilizing sound signals specifically to detect heart valve disease.",
    creator: "Humic Researcher",
    createdAt: "10-05-2020",
    image: "/images/thumbnail.png",
  },
  {
    slug: "sihedaf",
    title: "SiHeDAF",
    category: "Research Project",
    description:
      "Atrial Fibrillation Detector (SiHeDAF) is a portable system designed to detect arrhythmia based on heart signal monitoring.",
    creator: "Humic Researcher",
    createdAt: "22-06-2021",
    image: "/images/thumbnail.png",
  },
  {
    slug: "antropometri-kit",
    title: "Antropometri Kit",
    category: "Internship Project",
    description:
      "A measurement kit to monitor infant growth through observation of weight, height, head circumference, and nutrition by age.",
    creator: "Humic Researcher",
    createdAt: "14-03-2022",
    image: "/images/thumbnail.png",
  },
];

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  const otherProjects = projects.filter((p) => p.slug !== params.slug);

  if (!project) {
    return (
      <section>
        <Navbar />
          <section className="bg-gray-50 py-16 px-8 flex justify-center mt-20">
          <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white shadow-sm rounded-xl p-6 border border-gray-200 place-content-center">
            <div className="lg:flex-row gap-6 place-self-center">
              <p className="mb-6 ">Project not found.</p>
              <Link href="/catalog">
                <Button variant="primary">
                  Back to Projects
                </Button>
              </Link>
            </div>
            </div>
          </div>
          </section>
        <Footer />
      </section>
      // <div className="p-10 text-center text-gray-600">
      //   <p>Project not found.</p>
      //   <Link href="/catalog">
      //     <Button variant="primary" className="mt-4">
      //       Back to Projects
      //     </Button>
      //   </Link>
      // </div>
    );
  }

  return (
    <section>
      <Navbar />
        <section className="bg-gray-50 py-16 px-8 flex justify-center mt-20">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-6">
            {/* Left: Project Detail */}
            <div className="flex-1 bg-white shadow-sm rounded-xl p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0 w-full lg:w-1/2 bg-gray-100 rounded-xl overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="rounded-xl object-cover w-full h-full"
                />
                </div>

                <div className="flex-1 text-gray-800">
                <h2 className="text-2xl font-bold text-red-700 mb-2">
                    {project.title}
                </h2>
                <p className="text-sm font-semibold mb-2">
                    Category :{" "}
                    <span className="font-normal text-gray-700">
                    {project.category}
                    </span>
                </p>
                <p className="text-sm font-semibold mb-2">
                    Description :{" "}
                    <span className="font-normal text-gray-700">
                    {project.description}
                    </span>
                </p>
                <p className="text-sm font-semibold mb-2">
                    Creator :{" "}
                    <span className="font-normal text-gray-700">
                    {project.creator}
                    </span>
                </p>
                <p className="text-sm font-semibold mb-4">
                    Created at :{" "}
                    <span className="font-normal text-gray-700">
                    {project.createdAt}
                    </span>
                </p>
                <Button variant="primary">Open Project</Button>
                </div>
            </div>
            </div>

            {/* Right: Other Projects */}
            <div className="w-full lg:w-1/3 bg-white shadow-sm rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-red-600 pb-1 mb-4">
                Other Projects
            </h3>
            <div className="space-y-4">
                {otherProjects.map((p) => (
                <Link
                    key={p.slug}
                    href={`/catalog/${p.slug}`}
                    className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition"
                >
                    <div className="w-20 h-28 rounded-xl overflow-hidden relative flex-shrink-0">
                    <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                    />
                    </div>
                    <span className="font-semibold text-gray-900">{p.title}</span>
                </Link>
                ))}
            </div>
            </div>
        </div>
        </section>
      <Footer />
    </section>
  );
}