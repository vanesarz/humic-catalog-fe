"use client";

import Image from "next/image";
import { Edit2, Trash2, Plus, Upload, Link as LinkIcon } from "lucide-react";
import { useState, useRef, ChangeEvent, useEffect, useCallback } from "react";
import { getCookie } from "cookies-next";

/* -----------------------------------------
   TYPES
----------------------------------------- */
interface Admin {
  name: string;
}

interface InternshipItem {
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
export default function InternshipCatalog() {
  // const baseURL = "https://catalog-api.humicprototyping.net/api";
  const baseURL = "http://localhost:8000/api";
  const token = getCookie("token") as string | undefined;

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"files" | "link">("files");
  const [internships, setInternships] = useState<InternshipItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLink, setFormLink] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* -----------------------------------------
     FETCH INTERNSHIPS (ADMIN)
  ----------------------------------------- */
  const fetchInternships = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/admin/products`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      if (!res.ok) {
        console.error("Failed fetch internships");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const internshipItems: InternshipItem[] = data.data.filter(
        (item: InternshipItem) => item.category === "Internship Project"
      );

      setInternships(internshipItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchInternships();
  }, [fetchInternships]);

  const filteredInternships = internships.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* -----------------------------------------
     FILE UPLOAD HANDLER
  ----------------------------------------- */
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setSelectedFiles(files);
  };

  /* -----------------------------------------
     CREATE / UPDATE INTERNSHIP
  ----------------------------------------- */
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", formTitle);
    formData.append("description", formDescription);
    formData.append("category", "Internship Project");

    if (activeTab === "link") {
      formData.append("link", formLink);
    }

    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files[]", file);
      });
    }

    try {
      let res;
      if (editingSlug) {
        // UPDATE
        res = await fetch(`${baseURL}/admin/products/${editingSlug}`, {
          method: "PUT",
          headers: { Authorization: token ? `Bearer ${token}` : "" },
          body: formData,
        });
      } else {
        // CREATE
        res = await fetch(`${baseURL}/admin/products`, {
          method: "POST",
          headers: { Authorization: token ? `Bearer ${token}` : "" },
          body: formData,
        });
      }

      const data = await res.json();
      console.log("Saved:", data);
      fetchInternships();
      setShowModal(false);
      setFormTitle("");
      setFormDescription("");
      setFormLink("");
      setSelectedFiles(null);
      setEditingSlug(null);
    } catch (err) {
      console.error(err);
    }
  };

  /* -----------------------------------------
     DELETE INTERNSHIP
  ----------------------------------------- */
  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure want to delete this internship?")) return;

    try {
      const res = await fetch(`${baseURL}/admin/products/${slug}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const data = await res.json();
      console.log("Deleted:", data);
      fetchInternships();
    } catch (err) {
      console.error(err);
    }
  };

  /* -----------------------------------------
     EDIT INTERNSHIP
  ----------------------------------------- */
  const handleEdit = (item: InternshipItem) => {
    setEditingSlug(item.slug);
    setFormTitle(item.title);
    setFormDescription(item.description);
    setFormLink(""); // optional, fetch link separately if exists
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <span className="font-medium">Admin Panel</span> &gt;{" "}
        <span className="text-gray-700 font-semibold">Internship Catalog</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Internship Catalog</h1>
          <p className="text-sm text-gray-500">Manage all internship programs</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Internship
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">All Internships</h2>
            <p className="text-sm text-gray-500">A list of all internship programs</p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search internships..."
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
                <th className="py-2 px-3">Description</th>
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
                filteredInternships.map((item) => (
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
                    <td className="py-3 px-3">{item.admin?.name ?? "-"}</td>
                    <td className="py-3 px-3">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 truncate max-w-xs">{item.description}</td>
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

              {!loading && filteredInternships.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400 text-sm">
                    No internship found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              {editingSlug ? "Edit Internship" : "Create New Internship"}
            </h2>

            <div className="grid grid-cols-2 gap-5">
              {/* Left Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter title"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-700 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter description"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 h-24 text-sm focus:ring-2 focus:ring-red-700 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">User Manual Link (Optional)</label>
                  <input
                    type="text"
                    value={formLink}
                    onChange={(e) => setFormLink(e.target.value)}
                    placeholder="Enter link for user manual"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-700 outline-none"
                  />
                </div>
              </div>

              {/* Right Form */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Resources</p>

                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setActiveTab("files")}
                    className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 border ${
                      activeTab === "files"
                        ? "bg-red-700 text-white border-red-700"
                        : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <Upload className="w-4 h-4" /> Upload Files
                  </button>

                  <button
                    onClick={() => setActiveTab("link")}
                    className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 border ${
                      activeTab === "link"
                        ? "bg-red-700 text-white border-red-700"
                        : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <LinkIcon className="w-4 h-4" /> Project Link
                  </button>
                </div>

                {activeTab === "files" ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drop files here or click to browse</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Accepted: PDF, JPG, PNG (Max 10MB)
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Project Link</label>
                    <input
                      type="text"
                      value={formLink}
                      onChange={(e) => setFormLink(e.target.value)}
                      placeholder="Enter link..."
                      className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-sm"
              >
                {editingSlug ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}