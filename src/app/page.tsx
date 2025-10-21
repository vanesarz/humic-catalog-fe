"use client";

import { Navbar, Footer, Hero, About, Projects, Partners } from '@/components';
import { useAutoScrollSection } from "@/hooks/useAutoScrollSection";

export default function LandingPage() {
  useAutoScrollSection();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Partners />
      <Footer />
    </div>
  );
}