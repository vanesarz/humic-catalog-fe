"use client";

import Image from "next/image";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";
import { BookOpen } from "lucide-react";
import { Research } from "../types";

interface ViewResearchProps {
  open: boolean;
  data: Research | null;
  onClose: () => void;
}

export default function ViewResearch({ open, onClose, data }: ViewResearchProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="max-w-xl">
      <h2 className="text-xl font-semibold">Research Detail</h2>
      <div className="space-y-4">
        {data.thumbnail && (
          <div className="relative my-6 h-56 w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={data.thumbnail}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h2 className="text-xl font-bold text-red-700">{data.title}</h2>
        
        <label className="text-base font-semibold text-gray-700">Description</label>
        <p className="text-sm text-gray-500 text-justify">{data.description}</p>
        
        <label className="text-base font-semibold text-gray-700">Category</label>
        <p className="text-sm text-gray-500 text-justify">Research Project</p>

        {data.user_manual && (
          <div>
            <label className="text-base font-semibold text-gray-700">User Manual</label>
            <p>
              <a
                href={data.user_manual}
                target="_blank"
                className="text-red-600 underline break-all text-sm"
              >
                {data.user_manual}
              </a>
            </p>
          </div>
        )}

        {data.file_url && (
          <div>
            <label className="text-base font-semibold text-gray-700">Project Link</label>
            <p>
              <a
                href={data.file_url}
                target="_blank"
                className="text-red-600 underline break-all text-sm"
              >
                {data.file_url}
              </a>
            </p>
          </div>
        )}

        {data.file_path && (
          <div className="grid justify-stretch gap-2 pt-4 w-full place-self-center">
            <Button
              variant="primary"
              onClick={() =>
                window.open(
                  `https://catalog-api.humicprototyping.net/storage/${data.file_path}`,
                  "_blank"
                )
              }
            >
              <BookOpen className="w-5 h-5 mr-3" strokeWidth={2} />
              Open Project
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
}