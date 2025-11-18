"use client";

import { useState } from "react";

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    image?: string;
    github?: string;
    demo?: string;
    featured?: boolean;
}

export default function ProjectSection() {
    // Exemple de données de projets - à remplacer par vos propres projets
    const [projects] = useState<Project[]>([
        {
            id: 1,
            title: "Application E-commerce",
            description: "Plateforme complète de vente en ligne avec gestion de panier, paiement et administration.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            github: "https://github.com",
            demo: "https://demo.com",
            featured: true,
        },
        {
            id: 2,
            title: "Dashboard Analytics",
            description: "Tableau de bord interactif pour visualiser et analyser des données en temps réel.",
            technologies: ["Next.js", "TypeScript", "Chart.js"],
            github: "https://github.com",
            demo: "https://demo.com",
        },
        {
            id: 3,
            title: "API RESTful",
            description: "API robuste avec authentification JWT et documentation complète.",
            technologies: ["Node.js", "Express", "PostgreSQL"],
            github: "https://github.com",
        },
        {
            id: 4,
            title: "Application Mobile",
            description: "Application mobile cross-platform avec synchronisation cloud.",
            technologies: ["React Native", "Firebase"],
            github: "https://github.com",
            demo: "https://demo.com",
        },
    ]);

    return (
        <section 
            id="projet" 
            className="relative bg-white/95 dark:bg-black/95 backdrop-blur-sm h-screen snap-start snap-always flex items-center justify-center overflow-y-auto z-10"
        >
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center text-black dark:text-white">
                    Projets
                </h2>
                
                {/* Grille de projets responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 
                                     overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                                     flex flex-col"
                        >
                            {/* Image du projet (placeholder) */}
                            <div className="relative h-48 bg-gradient-to-br from-violet-900/20 dark:from-violet-400/20 to-violet-600/10 dark:to-violet-500/10 
                                          flex items-center justify-center overflow-hidden">
                                {project.image ? (
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                                        💻
                                    </div>
                                )}
                                {/* Badge "Featured" si applicable */}
                                {project.featured && (
                                    <span className="absolute top-4 right-4 bg-violet-900 dark:bg-violet-950 text-white text-xs font-medium px-3 py-1 rounded-full">
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Contenu du projet */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-semibold mb-3 text-black dark:text-white group-hover:text-violet-900 dark:group-hover:text-violet-400 transition-colors duration-200">
                                    {project.title}
                                </h3>
                                
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                                    {project.description}
                                </p>

                                {/* Technologies utilisées */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="bg-violet-900/10 dark:bg-violet-400/10 text-violet-900 dark:text-violet-400 
                                                     px-3 py-1 rounded-lg text-xs font-medium border border-violet-900/20 dark:border-violet-400/20
                                                     transition-all duration-200 hover:bg-violet-900/20 dark:hover:bg-violet-400/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Liens (GitHub, Demo) */}
                                <div className="flex gap-3 pt-2 border-t border-gray-200 dark:border-gray-800">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-4 py-2 bg-violet-900 dark:bg-violet-950 text-white rounded-lg 
                                                     hover:bg-violet-800 dark:hover:bg-violet-900 transition-all duration-200 
                                                     font-medium text-sm text-center shadow-md hover:shadow-lg"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-4 py-2 border-2 border-violet-900 dark:border-violet-800 
                                                     text-violet-900 dark:text-violet-400 rounded-lg 
                                                     hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-200 
                                                     font-medium text-sm text-center"
                                        >
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
