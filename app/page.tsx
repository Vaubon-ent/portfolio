import Navigation from "./components/sections/Navigation";
import ScrollHandler from "./components/ScrollHandler";
import BackgroundDecoration from "./components/ui/BackgroundDecoration";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillSection from "./components/sections/SkillsSection";
import ProjectSection from "./components/sections/ProjectSection";
import ContactSection from "./components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <BackgroundDecoration />
      <Navigation />
      <ScrollHandler />
      <main className="relative snap-y snap-mandatory overflow-y-scroll h-screen">
        <HeroSection />
        <AboutSection />
        <SkillSection />
        <ProjectSection />
        <ContactSection />
      </main>
    </>
  );
}
