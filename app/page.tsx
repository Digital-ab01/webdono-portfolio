import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProjectsSection from "@/components/ProjectsSection";
import StudioSection from "@/components/StudioSection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import { readProjects } from "@/lib/projects-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await readProjects();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero projects={projects} />
        <MarqueeStrip />
        <ProjectsSection projects={projects} />
        <StudioSection projects={projects} />
        <ProcessSection />
      </main>
      <Footer />
    </>
  );
}
