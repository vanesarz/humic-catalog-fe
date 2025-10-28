"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export function useAutoScrollSection(paramName = "scrollTo", delay = 300) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const sectionId = searchParams.get(paramName);
    if (!sectionId) return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offset = rect.top + window.scrollY - 80;

    // scroll halus ke elemen
    setTimeout(() => {
      window.scrollTo({ top: offset, behavior: "smooth" });

      // hapus query param setelah scroll
      router.replace(window.location.pathname, { scroll: false });
    }, delay);
  }, [searchParams, paramName, delay, router]);
}