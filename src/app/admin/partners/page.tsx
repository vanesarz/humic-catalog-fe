"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Search, Edit2, Trash2, Plus } from "lucide-react";
import { getCookie } from "cookies-next";
import { RawPartner, Partner } from "./types";

import CreatePartner from "./components/CreatePartner";
import EditPartner from "./components/EditPartner";
import DeletePartner from "./components/DeletePartner";

const adaptPartners = (raw: RawPartner[]): Partner[] => {
  return raw.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    category: item.category ?? "General",
    description: item.description ?? "",
    image: item.image,
  }));
};

// -------------------------------------------------------
// DUMMY FIXED UNTUK MATCH types.ts
// -------------------------------------------------------
const DUMMY: Partner[] = [
  {
    id: 1,
    name: "Dummy Tech Labs",
    slug: "dummy-tech-labs",
    category: "Technology",
    description: "Temporary dummy for UI preview",
    image: "https://placehold.co/150x90/png?text=Tech+Logo",
  },
  {
    id: 2,
    name: "Sample Innovations",
    slug: "sample-innovations",
    category: "Creative",
    description: "Another example partner",
    image: "https://placehold.co/150x90/png?text=Sample+Logo",
  },
];

export default function PartnerCatalog() {
  // const baseURL = "https://catalog-api.humicprototyping.net/api";
  const baseURL = "http://localhost:8000/api";
  const token = getCookie("token");

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  // popup states
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [deletingPartner, setDeletingPartner] = useState<Partner | null>(null);

  // -------------------------------------------------------
  // FETCH PARTNERS + ADAPTER
  // -------------------------------------------------------
  const fetchPartners = useCallback(async () => {
    try {
      const res = await fetch(`${baseURL}/admin/partners`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("fetch failed");

      const json = await res.json();
      const raw = json?.data as RawPartner[] | undefined;

      if (Array.isArray(raw) && raw.length > 0) {
        setPartners(adaptPartners(raw));
      } else {
        setPartners(DUMMY);
      }
    } catch (err) {
      console.error(err);
      setPartners(DUMMY);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  // -------------------------------------------------------
  // SLUGIFY
  // -------------------------------------------------------
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const filteredPartners = partners.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="p-6 space-y-6">
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
            <p className="text-sm text-gray-500">Manage partner organizations</p>
          </div>

          <button
            onClick={() => setShowPopup(true)}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Partner
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">All Partners</h2>

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
                    <th className="py-2 px-3">Logo</th>
                    <th className="py-2 px-3">Partner Name</th>
                    <th className="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPartners.map((item) => (
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
                        {item.name}
                      </td>

                      <td className="py-3 px-3 text-right flex gap-2 justify-end">
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
                      </td>
                    </tr>
                  ))}

                  {filteredPartners.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-6 text-gray-400 text-sm">
                        No partner found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* CREATE POPUP */}
      <CreatePartner
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={async (name, file) => {
          const form = new FormData();
          form.append("name", name);
          form.append("slug", slugify(name));
          form.append("image", file);

          try {
            const res = await fetch(`${baseURL}/admin/partners`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: form,
            });
            if (!res.ok) throw new Error("Failed creating partner");
            fetchPartners();
          } catch (err) {
            console.error(err);
            alert("Error creating partner");
          }
        }}
      />
      
      {/* EDIT POPUP */}
      <EditPartner
        open={!!editingPartner}
        data={editingPartner}
        onClose={() => setEditingPartner(null)}
        onConfirm={async (slug, newName) => {
          try {
            await fetch(`${baseURL}/admin/partners/${slug}`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: newName }),
            });
            fetchPartners();
          } catch (err) {
            console.error(err);
            alert("failed to edit partner");
          } finally {
            setEditingPartner(null);
          }
        }}
      />

      {/* DELETE POPUP */}
      <DeletePartner
        open={!!deletingPartner}
        data={deletingPartner}
        onClose={() => setDeletingPartner(null)}
        onConfirm={async (slug) => {
          try {
            await fetch(`${baseURL}/admin/partners/${slug}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            });
            fetchPartners();
          } catch (err) {
            console.error(err);
            alert("failed to delete partner");
          } finally {
            setDeletingPartner(null);
          }
        }}
      />
    </>
  );
}