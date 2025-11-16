import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillSection from "./components/sections/SkillsSection";
import ProjectSection from "./components/sections/ProjectSection";
import ContactSection from "./components/sections/ContactSection";
import FooterSection from "./components/sections/FooterSection";

// Composant principal de la page d'accueil
// En React, chaque composant est une fonction qui retourne du JSX (HTML-like)
export default function Home() {
  // Les données peuvent venir d'une API, d'un fichier, ou être définies ici
  const projects = [
    {
      title: "Projet 1",
      description: "Description du premier projet",
      link: "https://example.com"
    },
    {
      title: "Projet 2",
      description: "Description du deuxième projet",
      link: "https://example.com"
    }
  ];

  return (
    <main className="min-h-screen p-8">
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <ProjectSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
