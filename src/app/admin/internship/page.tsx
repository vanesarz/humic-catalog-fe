"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Search, Eye, Edit2, Trash2, Plus } from "lucide-react";
import { RawInternship, Internship } from "./types";

// COMPONENTS
import CreateInternship from "./components/CreateInternship";
import ViewInternship from "./components/ViewInternship";
import EditInternship from "./components/EditInternship";
import DeleteInternship from "./components/DeleteInternship";

// API
const API_BASE = "https://catalog-api.humicprototyping.net";
const API_URL = `${API_BASE}/api`;

// ADAPTER (NORMALIZE DATA DARI API)
const adaptInternships = (raw: RawInternship[]): Internship[] => {
  return raw.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug ?? item.title.toLowerCase().replace(/\s+/g, "-"),
    description: item.description ?? "",
    category: item.category,
    thumbnail: item.thumbnail_path
      ? `${API_BASE}/storage/${item.thumbnail_path}`
      : null,
    user_manual: item.user_manual ?? "",
    file: item.file_path ?? "",
    file_url: item.file_url ?? "",
  }));
};

// INTERNSHIP CATALOG
export default function InternshipCatalog() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // CRUD POPUP
  const [showPopup, setShowPopup] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [viewingInternship, setViewingInternship] = useState<Internship | null>(null);
  const [viewSlug, setViewSlug] = useState<string | null>(null);
  const [deletingInternship, setDeletingInternship] = useState<Internship | null>(null);

  // FETCH WITH AUTH
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API ERROR:", res.status, text);
      throw new Error(`API error ${res.status}`);
    }

    return res.json();
  };

  // FETCH INTERNSHIPS
  const fetchInternships = useCallback(async () => {
    try {
      const json = await fetchWithAuth(`${API_URL}/admin/products/internship`);
      const raw = json?.data as RawInternship[] | undefined;

      if (Array.isArray(raw)) {
        setInternships(adaptInternships(raw));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInternships();
  }, [fetchInternships]);

  // FETCH INTERNSHIP DETAILS
  useEffect(() => {
    if (!viewSlug) return;

    const loadDetail = async () => {
      try {
        const res = await fetchWithAuth(
          `${API_URL}/admin/products/internship/${viewSlug}`
        );

        const d = res.data;

        setViewingInternship({
          ...d,
          slug: viewSlug,
          thumbnail: d.thumbnail
            ? `${API_BASE}/storage/${d.thumbnail}`
            : null,
        });
      } catch (e) {
        console.error(e);
      }
    };

    loadDetail();
  }, [viewSlug]);

  // HELPERS
  const filteredInternships = internships.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // RENDER
  return (
    <div className="p-6 flex flex-col h-screen">
      <div className="space-y-6 shrink-0">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500">
          <span className="font-medium">Admin Panel</span> &gt;{" "}
          <span className="text-gray-700 font-semibold">Internship Catalog</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Internship Catalog
            </h1>
            <p className="text-sm text-gray-500">
              Manage all internship projects
            </p>
          </div>

          <button
            onClick={() => setShowPopup(true)}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Internship
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-1 mt-6 min-h-0 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">All Internships</h2>
            <p className="text-sm text-gray-500">A list of all internship projects</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-gray-400 text-sm py-4">Loading...</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-700">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600">
                  <th className="py-2 px-3 w-1/7">Image</th>
                  <th className="py-2 px-3 w-2/7">Product Name</th>
                  <th className="py-2 px-3 w-3/7">Description</th>
                  <th className="py-2 px-3 text-center w-1/7">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredInternships.map((item) => (
                  <tr
                    key={item.slug}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-3 w-1/7">
                      <div className="w-16 h-12 rounded-lg overflow-hidden relative">
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-100">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-3 font-medium text-gray-900 place-content-center w-2/7">
                      {item.title}
                    </td>

                    <td className="py-3 px-3 font-medium text-gray-900 place-content-center w-3/7">
                      {item.description}
                    </td>

                    <td className="py-3 px-3 text-center w-1/7">
                      <div className="inline-flex gap-[16px]">
                        <button
                          className="text-gray-600 hover:text-red-700"
                          onClick={() => setViewSlug(item.slug)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          className="text-gray-600 hover:text-red-700"
                          onClick={async () => {
                            const res = await fetchWithAuth(
                              `${API_URL}/admin/products/internship/${item.slug}`
                            );

                            const d = res.data;

                            setEditingInternship({
                              ...d,
                              slug: item.slug,
                              thumbnail: d.thumbnail
                                ? `${API_BASE}/storage/${d.thumbnail}`
                                : null,
                            });
                          }}

                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          className="text-gray-600 hover:text-red-700"
                          onClick={() => setDeletingInternship(item)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredInternships.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-400 text-sm">
                      No internship found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* CREATE */}
      <CreateInternship
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={async (payload) => {
          const form = new FormData();

          form.append("title", payload.title);
          form.append("description", payload.description);
          form.append("user_manual", payload.manual);
          form.append("file_url", payload.link);

          if (payload.thumbnail) {
            form.append("thumbnail", payload.thumbnail);
          }

          payload.files.forEach((file) => {
            form.append("file", file);
          });

          await fetchWithAuth(`${API_URL}/admin/products/internship`, {
            method: "POST",
            body: form,
          });

          fetchInternships();
        }}
      />

      {/* VIEW */}
      <ViewInternship
        open={!!viewingInternship}
        data={viewingInternship}
        onClose={() => setViewingInternship(null)}
      />

      {/* EDIT */}
      <EditInternship
        open={!!editingInternship}
        data={editingInternship}
        onClose={() => setEditingInternship(null)}
        onConfirm={async (slug, payload) => {
          if (!slug) {
            alert("Slug undefined");
            return;
          }

          const form = new FormData();

          form.append("title", payload.title);
          form.append("description", payload.description);
          form.append("user_manual", payload.user_manual);
          form.append("file_url", payload.file_url);

          if (payload.thumbnail) {
            form.append("thumbnail", payload.thumbnail);
          }

          payload.files.forEach((file) => {
            form.append("file", file);
          });

          form.append("_method", "PUT");

          try {
            await fetchWithAuth(
              `${API_URL}/admin/products/internship/update/${slug}`,
              {
                method: "POST",
                body: form,
              }
            );

            await fetchInternships();
          } catch (err) {
            console.error(err);
            alert("Failed to edit internship");
          } finally {
            setEditingInternship(null);
          }
        }}
      />

      {/* DELETE */}
      <DeleteInternship
        open={!!deletingInternship}
        data={deletingInternship}
        onClose={() => setDeletingInternship(null)}
        onConfirm={async (slug) => {
          console.log("DELETE internship:", slug);

          await fetchWithAuth(`${API_URL}/admin/products/internship/delete/${slug}`, {
            method: "DELETE",
          });

          await fetchInternships();
        }}
      />
    </div>
  );
}