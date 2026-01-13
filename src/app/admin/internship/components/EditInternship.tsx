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
  onConfirm: (
    slug: string,
    payload: {
      title: string;
      description: string;
      user_manual: string;
      file_url: string;
      thumbnail: File | null;
      files: File[];
    }
  ) => Promise<void>;
}

export default function EditInternship({
  open,
  data,
  onClose,
  onConfirm,
}: EditInternshipProps) {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [user_manual, setManual] = useState<string | null>(null);
  const [file_url, setLink] = useState<string | null>(null);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [existingPdf, setExistingPdf] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data || !open) return;

    setTitle(data.title ?? null);
    setDescription(data.description ?? null);
    setManual(data.user_manual ?? null);
    setLink(data.file_url ?? null);


    setThumbnail(null);
    setThumbnailPreview(data.thumbnail ?? null);

    setExistingPdf(data.file_path ?? null);
    setFiles([]);
  }, [data, open]);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFiles([file]);
    setExistingPdf(null);
  };

  const handleEdit = async () => {
    if (!data) return;

    const payload = {
      title: title ?? data.title,
      description: description ?? data.description ?? "",
      user_manual: user_manual ?? data.user_manual ?? "",
      file_url: file_url ?? data.file_url ?? "",
      thumbnail,
      files,
    };


    if (!payload.title) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);
      await onConfirm(data.slug, payload);
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
                value={title ?? data?.title ?? ""}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring ring-red-700 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description ?? data?.description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 px-3 py-2 max-h-48 min-h-32 border border-gray-300 rounded-lg text-sm focus:ring ring-red-700 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                User Manual <span className="text-red-700">(Optional)</span>
              </label>
              <input
                value={user_manual ?? data?.user_manual ?? ""}
                onChange={(e) => setManual(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring ring-red-700 outline-none"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
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
                        alt="thumbnail"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Click to replace
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-between text-gray-500">
                    <p>Choose file</p>
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
                value={file_url ?? data?.file_url ?? ""}
                onChange={(e) => setLink(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring ring-red-700 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Upload PDF
              </label>

              {existingPdf && !files.length && (
                <div className="mt-1 flex items-center justify-between border px-3 py-2 rounded-lg text-sm bg-gray-50">
                  <span className="truncate">
                    {existingPdf.split("/").pop()}
                  </span>
                  <button
                    onClick={() => setExistingPdf(null)}
                    className="text-red-600 text-xs"
                  >
                    remove
                  </button>
                </div>
              )}

              {files.length > 0 && (
                <div className="mt-1 flex items-center justify-between border px-3 py-2 rounded-lg text-sm bg-gray-50">
                  <span className="truncate">{files[0].name}</span>
                  <button
                    onClick={() => setFiles([])}
                    className="text-red-600 text-xs"
                  >
                    remove
                  </button>
                </div>
              )}

              <label className="mt-2 block w-full border border-dashed border-gray-300 rounded-lg px-3 py-2 cursor-pointer text-sm text-center hover:border-red-700 transition">
                <div className="flex justify-between text-gray-500">
                  <p>{existingPdf || files.length ? "Replace file" : "Choose file"}</p>
                  <Upload className="w-4 h-4" />
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFilesChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-4">
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