import { Navbar, Footer, Hero, About, Projects, Partners } from '@/components';

export default function LandingPage() {
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