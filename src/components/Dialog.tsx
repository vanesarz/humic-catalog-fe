"use client";

import React from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;

  maxWidth?: string;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  children,
  maxWidth = "max-w-lg",
  className = "",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-xl shadow-lg p-6 max-h-9/10 w-full relative ${maxWidth} ${className}`}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Dialog;