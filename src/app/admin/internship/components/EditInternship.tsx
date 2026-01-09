"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";
import { Upload } from "lucide-react";
import { Internship } from "../types";

interface EditInternshipProps {
  open: boolean;
  data: Internship | null;
  onClose: () => void;
  onConfirm: (slug: string, payload: {
    title: string;
    description: string;
    user_manual: string;
    file_url: string;
    thumbnail: File | null;
    files: File[];
  }) => Promise<void>;
}

export default function EditInternship({ open, data, onClose, onConfirm }: EditInternshipProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user_manual, setManual] = useState("");
  const [file_url, setLink] = useState("");

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);

  // pre-fill form saat data berubah
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description || "");
      setManual(data.user_manual || "");
      setLink(data.file_url || "");
      setThumbnail(null); // harus null karena belum ada file baru
      setThumbnailPreview(data.thumbnail || null); // pakai string untuk preview
      setFiles([]);
    }
  }, [data]);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleEdit = async () => {
  if (!data) return;

  // validasi form
  if (!title.trim()) return alert("Title is required");
  if (!description.trim()) return alert("Description is required");

  try {
    setLoading(true);

    await onConfirm(data.slug, {
      title: title.trim(), // pastiin string
      description: description.trim(),
      user_manual: user_manual?.trim() || "", // default ke string kosong
      file_url: file_url?.trim() || "",       // default ke string kosong
      thumbnail, // file bisa null
      files,     // array file bisa kosong
    });

    onClose();
  } catch (err) {
    console.error(err);
    alert("Failed to update internship");
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="max-w-2xl">
      <div className="space-y-5">
        <h2 className="text-xl font-semibold">Edit Internship</h2>

        <div className="grid grid-cols-2 gap-5">
          {/* LEFT */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product name"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring ring-red-700 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full mt-1 px-3 py-2 max-h-48 min-h-32 border border-gray-300 rounded-lg text-sm focus:ring ring-red-700 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                User Manual <span className="text-red-700">(Optional)</span>
              </label>
              <input
                value={user_manual}
                onChange={(e) => setManual(e.target.value)}
                placeholder="Enter user manual link"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring ring-red-700 outline-none"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            {/* Thumbnail */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Thumbnail
              </label>
              <label className="mt-1 block w-full border border-dashed border-gray-300 rounded-lg px-3 py-2 cursor-pointer text-sm text-center hover:border-red-700 transition">
                {thumbnailPreview ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24">
                      <Image
                        src={thumbnailPreview}
                        alt="thumbnail preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Click to replace
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-between text-gray-500">
                    <p className="text-sm font-medium">Choose file</p>
                    <Upload className="w-4 h-4" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Project Link
              </label>
              <input
                value={file_url}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter project link"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring ring-red-700 outline-none"
              />
            </div>

            {/* Files */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Upload PDF / Images
              </label>
              <label className="mt-1 block w-full border border-dashed border-gray-300 rounded-lg px-3 py-2 cursor-pointer text-sm text-center hover:border-red-700 transition">
                <div className="flex flex-row items-center justify-between text-gray-500">
                  <p className="text-sm font-medium">
                    {files.length > 0
                      ? `${files.length} file(s) selected`
                      : "Choose files"}
                  </p>
                  <Upload className="w-4 h-4" />
                </div>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFilesChange}
                  className="hidden"
                />
              </label>

              <div className="mt-2 w-full border border-blue-400 rounded-lg px-3 py-2 bg-blue-50">
                <p className="text-xs text-blue-800">
                  Images will be automatically converted to PDF format.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 justify-stretch gap-2 pt-4 w-full">
          <Button variant="primary" onClick={handleEdit} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
}