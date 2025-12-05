"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/app/data/types";
import { getProjectRoute } from "@/app/utils/projectRoutes";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    // Construire le chemin de l'image : utiliser project.image si disponible,
    // sinon utiliser la première image du dossier image__file
    const getImageSrc = () => {
        // Priorité 1 : utiliser project.image si défini
        if (project.image) {
            return project.image;
        }
        
        // Priorité 2 : construire le chemin à partir de image__file
        // On utilise la première image du dossier (triée alphabétiquement)
        if (project["image__file"]) {
            const folder = project["image__file"].startsWith("/") 
                ? project["image__file"] 
                : `/${project["image__file"]}`;
            
            // Pour chaque projet, on essaie de deviner le nom de la première image
            // Basé sur les images existantes dans les dossiers
            const imageMap: Record<string, string> = {
                "/tnk": "/tnk/tnk.png",
                "/defi": "/defi/analyse.png", // Première image alphabétiquement
            };
            
            return imageMap[folder] || null;
        }
        
        return null;
    };

    const [imageError, setImageError] = useState(false);
    const imageSrc = getImageSrc();
    const hasImage = imageSrc && !imageError;

    // Déterminer si l'image est un logo (pour utiliser object-contain au lieu de object-cover)
    const isLogo = imageSrc?.includes("/tnk/tnk.png") || imageSrc?.toLowerCase().includes("logo");

    return (
        <div className="min-w-full h-full snap-start flex items-center justify-center px-8 md:px-16 lg:px-24">
            <div className="max-w-5xl w-full mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Image ou placeholder */}
                    <div className="relative aspect-[16/10]">
                        {hasImage ? (
                            <img
                                src={imageSrc}
                                alt={project.title}
                                className="w-full h-full object-contain rounded-lg"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center rounded-lg">
                                <div className="text-8xl opacity-20">
                                    {project.type === "pro" ? "💼" : "💻"}
                                </div>
                            </div>
                        )}
                        
                        {/* Tag en haut à gauche */}
                        {project.type === "pro" ? (
                            <span className="absolute top-4 left-4 bg-violet-900 dark:bg-violet-950 text-white text-xs font-semibold px-4 py-2 rounded-full">
                                Pro
                            </span>
                        ) : (
                            <span className="absolute top-4 left-4 bg-violet-900 dark:bg-violet-950 text-white text-xs font-semibold px-4 py-2 rounded-full">
                                Perso
                            </span>
                        )}
                    </div>

                    {/* Contenu */}
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black dark:text-white">
                                {project.title}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Bouton Voir plus */}
                        <div className="pt-4">
                            {getProjectRoute(project.id) ? (
                                <Link 
                                    href={getProjectRoute(project.id)!}
                                    className="inline-block px-6 py-3 bg-violet-900 dark:bg-violet-950 text-white rounded-lg hover:bg-violet-800 dark:hover:bg-violet-900 transition-all duration-200 font-medium"
                                >
                                    Voir plus
                                </Link>
                            ) : (
                                <button 
                                    disabled
                                    className="px-6 py-3 bg-gray-400 dark:bg-gray-600 text-white rounded-lg cursor-not-allowed font-medium opacity-50"
                                >
                                    Voir plus
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

