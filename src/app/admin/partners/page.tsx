"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Search, Edit2, Trash2, Plus } from "lucide-react";
import { RawPartner, Partner } from "./types";

// COMPONENTS
import CreatePartner from "./components/CreatePartner";
import EditPartner from "./components/EditPartner";
import DeletePartner from "./components/DeletePartner";

// API
const API_BASE = "https://catalog-api.humicprototyping.net";
const API_URL = `${API_BASE}/api`;

// ADAPTER (NORMALIZE DATA DARI API)
const adaptPartners = (raw: RawPartner[]): Partner[] => {
  return raw.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug ?? item.name.toLowerCase().replace(/\s+/g, "-"),
    image: item.image_path
      ? `${API_BASE}/storage/${item.image_path}`
      : null,
  }));
};

// PARTNER CATALOG
export default function PartnerCatalog() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // CRUD POPUP
  const [showPopup, setShowPopup] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [deletingPartner, setDeletingPartner] = useState<Partner | null>(null);

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

  // FETCH PARTNERS
  const fetchPartners = useCallback(async () => {
    try {
      const json = await fetchWithAuth(`${API_URL}/admin/partners`);
      const raw = json?.data as RawPartner[] | undefined;

      if (Array.isArray(raw)) {
        setPartners(adaptPartners(raw));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  // HELPERS
  const filteredPartners = partners.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // RENDER
  return (
    <div className="p-6 flex flex-col h-screen">
      <div className="space-y-6 shrink-0">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500">
          <span className="font-medium">Admin Panel</span> &gt;{" "}
          <span className="text-gray-700 font-semibold">Partners</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Partner Catalog
            </h1>
            <p className="text-sm text-gray-500">
              Manage partner organizations
            </p>
          </div>

          <button
            onClick={() => setShowPopup(true)}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Partner
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-1 mt-6 min-h-0 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            All Partners
          </h2>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search partners..."
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
                  <th className="py-2 px-3 w-1/6">Logo</th>
                  <th className="py-2 px-3 w-4/6">Partner Name</th>
                  <th className="py-2 px-3 text-center w-1/6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPartners.map((item) => (
                  <tr
                    key={item.slug}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-3 w-1/6">
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-100">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-3 font-medium text-gray-900 place-content-center w-4/6">
                      {item.name}
                    </td>

                    <td className="py-3 px-3 text-center w-1/6">
                      <div className="inline-flex gap-[16px]">
                        <button
                          className="text-gray-600 hover:text-red-700"
                          onClick={() => setEditingPartner(item)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          className="text-gray-600 hover:text-red-700"
                          onClick={() => setDeletingPartner(item)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredPartners.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center py-6 text-gray-400 text-sm"
                    >
                      No partner found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* CREATE */}
      <CreatePartner
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={async (name, file) => {
          const form = new FormData();
          form.append("name", name);
          form.append("image", file);

          try {
            await fetchWithAuth(`${API_URL}/admin/partners`, {
              method: "POST",
              body: form,
            });
            fetchPartners();
          } catch (err) {
            console.error(err);
            alert("Error creating partner");
          }
        }}
      />

      {/* EDIT */}
      <EditPartner
        open={!!editingPartner}
        data={editingPartner}
        onClose={() => setEditingPartner(null)}
        onConfirm={async (
          slug: string,
          newName: string,
          newFile?: File
        ) => {
          if (!slug) {
            console.error("EDIT ERROR: slug undefined", editingPartner);
            alert("Slug undefined");
            return;
          }

          const form = new FormData();
          form.append("name", newName);

          if (newFile) {
            form.append("image", newFile);
          }

          form.append("_method", "PUT");

          console.log("EDIT SLUG:", slug);

          try {
            const res = await fetchWithAuth(
              `${API_URL}/admin/partners/${slug}`,
              {
                method: "POST",
                body: form,
              }
            );

            console.log("EDIT RESPONSE:", res);
            await fetchPartners();
          } catch (err) {
            console.error(err);
            alert("Failed to edit partner");
          } finally {
            setEditingPartner(null);
          }
        }}
      />

      {/* DELETE */}
      <DeletePartner
        open={!!deletingPartner}
        data={deletingPartner}
        onClose={() => setDeletingPartner(null)}
        onConfirm={async (slug: string) => {
          console.log("DELETE partner:", slug);

          await fetchWithAuth(`${API_URL}/admin/partners/${slug}`, {
            method: "DELETE",
          });

          await fetchPartners();
        }}
      />
    </div>
  );
}