"use client";

import Image from "next/image";
import { Edit2, Trash2, Plus } from "lucide-react";
import { useState, useRef, ChangeEvent, useEffect, useCallback } from "react";
import { getCookie } from "cookies-next";

/* -----------------------------------------
   TYPES
----------------------------------------- */
interface Admin {
  name: string;
}

interface BackendResearchItem {
  id: number;
  title: string;
  description: string;
  category?: string;
  created_at: string;
  thumbnail_path?: string | null;
  admin?: Admin | null;
  slug: string;
}

interface ResearchItem {
  id: number;
  title: string;
  description: string;
  category: string;
  created_at: string;
  thumbnail_path: string | null;
  admin: Admin | null;
  slug: string;
}

/* -----------------------------------------
   COMPONENT
----------------------------------------- */
export default function ResearchCatalog() {
  const baseURL = "http://localhost:8000/api";
  const token = getCookie("token") as string | undefined;

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [researches, setResearches] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLink, setFormLink] = useState("");
  const [formManual, setFormManual] = useState("");

  // file state
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const thumbnailRef = useRef<HTMLInputElement | null>(null);
  const filesRef = useRef<HTMLInputElement | null>(null);

  /* -----------------------------------------
    FETCH RESEARCHES (ADMIN)
  ----------------------------------------- */
  const fetchResearches = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/admin/products/research`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed fetch researches, status:", res.status);
        setLoading(false);
        return;
      }

      const data: { data: BackendResearchItem[] } = await res.json();

      const researchItems: ResearchItem[] = data.data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category ?? "",
        created_at: item.created_at,
        thumbnail_path: item.thumbnail_path ?? null,
        admin: item.admin ?? null,
        slug: item.slug,
      }));

      setResearches(researchItems);
    } catch (err) {
      console.error("Error fetchResearches:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchResearches();
  }, [fetchResearches]);

  const filteredResearches = researches.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* -----------------------------------------
     FILE UPLOAD HANDLERS
  ----------------------------------------- */
  const handleThumbnailUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setThumbnail(e.target.files[0]);
  };

  const handleFilesUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  /* -----------------------------------------
     CREATE / UPDATE RESEARCH
  ----------------------------------------- */
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", formTitle);
    formData.append("description", formDescription);
    formData.append("category", "Research Project");
    formData.append("project_link", formLink);

    if (thumbnail) formData.append("thumbnail", thumbnail);
    files.forEach((file) => formData.append("files[]", file));

    try {
      let res;
      if (editingSlug) {
        const encodedSlug = encodeURIComponent(editingSlug);
        res = await fetch(`${baseURL}/admin/products/research/${encodedSlug}/update`, {
          method: "PUT",
          headers: { Authorization: token ? `Bearer ${token}` : "" },
          body: formData,
        });
      } else {
        res = await fetch(`${baseURL}/admin/products/research`, {
          method: "POST",
          headers: { Authorization: token ? `Bearer ${token}` : "" },
          body: formData,
        });
      }

      if (!res.ok) throw new Error("Failed to save");

      await fetchResearches();

      // reset form
      setFormTitle("");
      setFormDescription("");
      setFormLink("");
      setThumbnail(null);
      setFormManual("");
      setFiles([]);
      setEditingSlug(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save research data.");
    }
  };

  /* -----------------------------------------
     DELETE RESEARCH
  ----------------------------------------- */
  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure want to delete this research?")) return;

    try {
      const encodedSlug = encodeURIComponent(slug);
      const res = await fetch(`${baseURL}/admin/products/research/${encodedSlug}/delete`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      if (!res.ok) throw new Error("Failed to delete");

      await fetchResearches();
    } catch (err) {
      console.error(err);
      alert("Failed to delete research.");
    }
  };

  /* -----------------------------------------
     EDIT RESEARCH
  ----------------------------------------- */
  const handleEdit = (item: ResearchItem) => {
    setEditingSlug(item.slug);
    setFormTitle(item.title);
    setFormDescription(item.description);
    setFormLink("");
    setThumbnail(null);
    setFiles([]);
    setShowModal(true);
  };

  /* -----------------------------------------
     RENDER
  ----------------------------------------- */
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
          <h1 className="text-2xl font-semibold text-gray-800">Research Catalog</h1>
          <p className="text-sm text-gray-500">Manage all research projects</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Research
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">All Researches</h2>
            <p className="text-sm text-gray-500">A list of all research projects</p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search researches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="py-2 px-3">Image</th>
                <th className="py-2 px-3">Product Name</th>
                <th className="py-2 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">
                    Loading…
                  </td>
                </tr>
              )}

              {!loading &&
                filteredResearches.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-3">
                      <div className="w-16 h-12 rounded-lg overflow-hidden relative">
                        <Image
                          src={
                            item.thumbnail_path
                              ? `https://catalog-api.humicprototyping.net/storage/${item.thumbnail_path}`
                              : "/images/default.jpg"
                          }
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium text-gray-900">{item.title}</td>
                    <td className="py-3 px-3 text-right flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-gray-600 hover:text-red-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.slug)}
                        className="text-gray-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}

              {!loading && filteredResearches.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400 text-sm">
                    No research found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              {editingSlug ? "Edit Research" : "Create New Research"}
            </h2>

            <div className="grid grid-cols-2 gap-5">
              {/* Left Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter product name"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-700 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">Description</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter description"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 h-32 text-sm focus:ring-2 focus:ring-red-700 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">User Manual <span className="text-red-700">(Optional)</span></label>
                  <input
                    type="text"
                    value={formManual}
                    onChange={(e) => setFormManual(e.target.value)}
                    placeholder="Enter user manual link"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-700 outline-none"
                  />
                </div>
              </div>

              {/* Right Form */}
              <div className="space-y-4">
                {/* Thumbnail */}
                <div>
                  <label className="text-sm font-bold text-gray-700">Thumbnail</label>
                  <div
                    onClick={() => thumbnailRef.current?.click()}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer focus:ring-2 focus:ring-red-700 outline-none"
                  >
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      ref={thumbnailRef}
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500">
                      {thumbnail ? thumbnail.name : "Choose thumbnail"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">Project Link</label>
                  <input
                    type="text"
                    value={formLink}
                    onChange={(e) => setFormLink(e.target.value)}
                    placeholder="Enter project link"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-700 outline-none"
                  />
                </div>

                {/* Files */}
                <div>
                  <label className="text-sm font-bold text-gray-700">Upload PDF/Images</label>
                  <div
                    onClick={() => filesRef.current?.click()}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer focus:ring-2 focus:ring-red-700 outline-none"
                  >
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      ref={filesRef}
                      onChange={handleFilesUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500">
                      {files.length > 0 ? `${files.length} file(s) selected` : "Choose files"}
                    </p>
                  </div>

                  <div className="mt-2 w-full border border-blue-400 rounded-lg px-3 py-2 bg-blue-50">
                    <p className="text-xs text-blue-800">
                      Images will be automatically converted to PDF format.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="w-full border- mt-12 mb-6 mx-auto opacity-10" />

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2 w-full bg-red-700 hover:bg-red-800 text-white rounded-lg text-sm"
              >
                {editingSlug ? "Update" : "Create"}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 w-full border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}