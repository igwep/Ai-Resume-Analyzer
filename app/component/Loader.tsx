"use client";
import React from "react";
import { cn } from "../lib/cn";

interface LoaderProps {
  fullscreen?: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ fullscreen, message = "Loading…" }) => {
  return (
    <div
      className={cn(
        fullscreen
          ? "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          : "inline-flex flex-col items-center justify-center"
      )}
    >
      {/* Spinner */}
      <span className="relative inline-block w-12 h-12">
        {/* Outer Ring */}
        <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-600 animate-spin"></span>
        {/* Inner Circle */}
        <span className="absolute inset-3 rounded-full bg-[#0F172A]"></span>
      </span>

      {/* Message */}
      {message && (
        <p className="mt-4 text-sm font-medium text-neutral-300">{message}</p>
      )}
    </div>
  );
};

export default Loader;
