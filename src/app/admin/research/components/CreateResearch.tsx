"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";
import { Upload } from "lucide-react";

interface CreateResearchProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (payload: {
    title: string;
    description: string;
    manual: string;
    link: string;
    thumbnail: File | null;
    files: File[];
  }) => Promise<void>;
}

export default function CreateResearch({
  open,
  onClose,
  onConfirm,
}: CreateResearchProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [manual, setManual] = useState("");
  const [link, setLink] = useState("");

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);

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

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setManual("");
    setLink("");
    setThumbnail(null);
    setThumbnailPreview(null);
    setFiles([]);
  };

  const handleCreate = async () => {
    if (!title) return alert("Title is required");
    if (!description) return alert("Description is required");

    try {
      setLoading(true);

      await onConfirm({
        title,
        description,
        manual,
        link,
        thumbnail,
        files,
      });

      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create research");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="max-w-2xl">
      <div className="space-y-5">
        <h2 className="text-xl font-semibold">Create New Research</h2>

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
                className="w-full mt-1 px-3 py-2 max-h-48 min-h-32 border border-gray-300 rounded-lg text-sm  focus:ring ring-red-700 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                User Manual <span className="text-red-700">(Optional)</span>
              </label>
              <input
                value={manual}
                onChange={(e) => setManual(e.target.value)}
                placeholder="Enter user manual link"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm  focus:ring ring-red-700 outline-none"
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
                    <p className="text-sm font-medium">
                      Choose file
                    </p>
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
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter project link"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm  focus:ring ring-red-700 outline-none"
              />
            </div>

            {/* Files */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Upload PDF
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
                  accept=".pdf"
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
          <Button variant="primary" onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
}