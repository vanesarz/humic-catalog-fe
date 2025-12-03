"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Camera, Save } from "lucide-react";
import { getCookie } from "cookies-next";

interface AdminProfile {
  name: string;
  email: string;
  role: string;
  image?: string | null;
}

export default function ProfilePage() {
  // const baseURL = "https://catalog-api.humicprototyping.net/api";
  const baseURL = "http://localhost:8000/api";
  const token = getCookie("token") as string | undefined;

  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // -------------------------------------------------------------------
  // FETCH PROFILE
  // -------------------------------------------------------------------
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${baseURL}/admin/profile`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      setAdmin(data.data ?? null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // -------------------------------------------------------------------
  // HANDLE IMAGE
  // -------------------------------------------------------------------
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!imageFile) {
      console.log("no new image uploaded");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(`${baseURL}/admin/profile/image`, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      });

      const data = await res.json();
      console.log("upload result:", data);

      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500 text-sm">Loading...</p>;
  }

  // initials fallback
  const initials =
    admin?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "AD";

  const imageSrc =
    imagePreview ??
    (typeof admin?.image === "string" && admin.image.length > 0
      ? admin.image
      : null);

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <span className="font-medium">Admin Panel</span> &gt;{" "}
        <span className="text-gray-700 font-semibold">Profile</span>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Profile Settings</h1>
        <p className="text-sm text-gray-500">Manage your account information</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-3xl">
        {/* Title */}
        <p className="font-semibold mb-1 text-gray-800">Account Information</p>
        <p className="text-sm text-gray-500 mb-6">
          Update your personal information
        </p>

        {/* Profile picture */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative w-20 h-20">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="profile"
                fill
                className="object-cover rounded-full border"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-red-700 text-white flex items-center justify-center text-xl font-bold">
                {initials}
              </div>
            )}

            <label className="absolute bottom-0 right-0 bg-red-700 text-white p-1.5 rounded-full cursor-pointer hover:bg-red-800 transition">
              <Camera className="w-4 h-4" />
              <input type="file" className="hidden" onChange={handleFile} />
            </label>
          </div>

          <div className="text-gray-500 text-xs">
            Click the camera icon to upload a new profile picture. <br />
            Recommended size: 400×400px
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={admin?.name ?? ""}
              readOnly
              className="w-full mt-1 px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={admin?.email ?? ""}
              readOnly
              className="w-full mt-1 px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            value={admin?.role ?? "Administrator"}
            readOnly
            className="w-full mt-1 px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg text-sm"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}