"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useAutoScrollSection(paramName = "scrollTo", delay = 300) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sectionId = searchParams.get(paramName);
    if (!sectionId) return;

    const element = document.getElementById(sectionId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, delay);
    }
  }, [searchParams, paramName, delay]);
}