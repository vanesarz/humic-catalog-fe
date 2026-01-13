"use client";

import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";
import { Upload } from "lucide-react";
import { Partner } from "../types";

interface EditPartnerProps {
  open: boolean;
  data: Partner | null;
  onClose: () => void;
  onConfirm: (
    slug: string,
    newName: string,
    newFile?: File
  ) => Promise<void>;
}

export default function EditPartner({ open, onClose, data, onConfirm }: EditPartnerProps) {
  const [name, setName] = useState(data?.name ?? "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(data?.image ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setLogoPreview(data.image);
      setLogoFile(null);
    }
  }, [data]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!name) return alert("Partner name required");

    try {
      setLoading(true);
      await onConfirm(data!.slug, name, logoFile || undefined);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update partner");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="max-w-lg space-y-4">
        <h2 className="text-xl font-semibold">Edit Partner</h2>

        {/* Partner Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Partner Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-700 focus:outline-none"
          />
        </div>

        {/* Partner Logo */}
        <div>
          <label className="text-sm font-medium text-gray-700">Partner Logo</label>
          <label className="mt-1 block w-full border-2 border-dashed border-gray-300 rounded-lg py-10 text-center cursor-pointer hover:border-red-700 transition">
            {logoPreview ? (
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20">
                  <Image
                    src={logoPreview}
                    alt="preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Click to replace</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <Upload className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">
                  Click to upload <span className="text-gray-400">or drag and drop</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, or WEBP (max 5MB)</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Dialog>
  );
}