"use client";

import Image from "next/image";
import { useState } from "react";
import { Search, Eye, Edit2, Trash2, Plus } from "lucide-react";

export default function ResearchCatalog() {
  const [searchTerm, setSearchTerm] = useState("");

  const researchs = [
    {
      id: 1,
      image: "/images/sample1.jpg",
      name: "Software Engineering Internship",
      creator: "John Doe",
      createdAt: "01-11-2024",
      description:
        "Full-stack development internship with modern technologies including React and Node.js.",
      hasManual: true,
    },
    {
      id: 2,
      image: "/images/sample2.jpg",
      name: "Data Science Internship",
      creator: "Jane Smith",
      createdAt: "15-10-2024",
      description:
        "Work with big data and machine learning projects using Python, TensorFlow, and Scikit-learn.",
      hasManual: true,
    },
    {
      id: 3,
      image: "/images/sample3.jpg",
      name: "UI/UX Design Internship",
      creator: "Mike Johnson",
      createdAt: "20-10-2024",
      description:
        "Create beautiful and intuitive user interfaces with Figma, Adobe XD, and modern design systems.",
      hasManual: true,
    },
  ];

  const filteredResearchs = researchs.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <span className="font-medium">Admin Panel</span> &gt;{" "}
        <span className="text-gray-700 font-semibold">Research Catalog</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Research Catalog
          </h1>
          <p className="text-sm text-gray-500">
            Manage all research programs
          </p>
        </div>
        <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Research
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              All Research
            </h2>
            <p className="text-sm text-gray-500">
              A list of all research programs
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search research..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="py-2 px-3">Image</th>
                <th className="py-2 px-3">Product Name</th>
                <th className="py-2 px-3">Creator</th>
                <th className="py-2 px-3">Created At</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResearchs.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-3">
                    <div className="w-16 h-12 rounded-lg overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-3 font-medium text-gray-900">
                    <div>{item.name}</div>
                    {item.hasManual && (
                      <span className="text-xs bg-gray-100 border border-gray-300 text-gray-600 px-2 py-0.5 rounded-md mt-1 inline-block">
                        Has Manual
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">{item.creator}</td>
                  <td className="py-3 px-3">{item.createdAt}</td>
                  <td className="py-3 px-3 truncate max-w-xs">
                    {item.description}
                  </td>
                  <td className="py-3 px-3 text-right flex gap-2 justify-end">
                    <button className="text-gray-600 hover:text-red-700">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-red-700">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredResearchs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-400 text-sm"
                  >
                    No research found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}