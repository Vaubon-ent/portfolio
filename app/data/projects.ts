import { Project } from "./types";

// Vous pouvez aussi importer directement depuis le JSON si vous préférez
// import projectsData from "./projects.json";
// export const projects: Project[] = projectsData as Project[];

export const projects: Project[] = [
  {
    id: 1,
    title: "Application E-commerce",
    description: "Plateforme complète de vente en ligne avec gestion de panier, paiement et administration.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    image: null,
    github: "https://github.com",
    demo: "https://demo.com",
    type: "pro",
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description: "Tableau de bord interactif pour visualiser et analyser des données en temps réel.",
    technologies: ["Next.js", "TypeScript", "Chart.js"],
    image: null,
    github: "https://github.com",
    demo: "https://demo.com",
    type: "perso",
  },
  {
    id: 3,
    title: "API RESTful",
    description: "API robuste avec authentification JWT et documentation complète.",
    technologies: ["Node.js", "Express", "PostgreSQL"],
    image: null,
    github: "https://github.com",
    demo: null,
    type: "perso",
  },
];

