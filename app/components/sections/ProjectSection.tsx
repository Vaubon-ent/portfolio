"use client";

import { useState, useEffect, useRef } from "react";
import projectsData from "@/app/data/projects.json";
import type { Project } from "@/app/data/types";
import { sortProjects } from "@/app/utils/projectUtils";
import { useHorizontalScroll } from "@/app/hooks/useHorizontalScroll";
import ProjectIndicator from "@/app/components/ui/ProjectIndicator";
import ProjectCard from "@/app/components/ui/ProjectCard";
import ProjectMobileIndicator from "@/app/components/ui/ProjectMobileIndicator";

export default function ProjectSection() {
    // Charger les projets depuis le fichier JSON
    const [projects] = useState<Project[]>(projectsData as Project[]);
    
    // État pour masquer le contenu pendant la transition
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Trier les projets : pro en premier, puis perso
    const sortedProjects = sortProjects(projects);

    // Utiliser le hook pour gérer le scroll horizontal
    const { currentIndex, scrollContainerRef, sectionRef, scrollToItem } =
        useHorizontalScroll({
            totalItems: sortedProjects.length,
        });

    // Flag pour s'assurer que le scroll automatique ne se fait qu'une seule fois
    const hasScrolledToProject = useRef(false);

    // Détecter le paramètre project dans l'URL et scroller vers le projet correspondant
    useEffect(() => {
        // Vérifier si on est côté client
        if (typeof window === "undefined") return;
        
        // Ne faire le scroll automatique qu'une seule fois
        if (hasScrolledToProject.current) return;

        const urlParams = new URLSearchParams(window.location.search);
        const projectIdParam = urlParams.get("project");
        
        if (projectIdParam) {
            const projectId = parseInt(projectIdParam, 10);
            const projectIndex = sortedProjects.findIndex(p => p.id === projectId);
            
            if (projectIndex !== -1) {
                // Marquer comme fait pour éviter les re-déclenchements
                hasScrolledToProject.current = true;
                
                // Masquer le contenu pendant la transition
                setIsTransitioning(true);
                
                // Masquer aussi le main pour éviter de voir la section hero
                const main = document.querySelector("main");
                if (main) {
                    (main as HTMLElement).style.opacity = "0";
                }
                
                // Scroll instantané vers la section projets (sans animation)
                const section = document.getElementById("projet");
                if (section) {
                    section.scrollIntoView({ behavior: "instant", block: "start" });
                }
                
                // Scroll instantané vers le bon projet dans le conteneur horizontal
                const container = scrollContainerRef.current;
                if (container) {
                    const containerWidth = container.clientWidth;
                    container.scrollLeft = projectIndex * containerWidth;
                }
                
                // Attendre un court instant puis réafficher le contenu
                setTimeout(() => {
                    setIsTransitioning(false);
                    
                    // Réafficher le main
                    if (main) {
                        (main as HTMLElement).style.opacity = "1";
                    }
                    
                    // Supprimer le paramètre de l'URL après le scroll pour éviter les re-déclenchements
                    const newUrl = new URL(window.location.href);
                    newUrl.searchParams.delete("project");
                    window.history.replaceState({}, "", newUrl.toString());
                }, 150);
            }
        }
    }, [sortedProjects, scrollToItem, scrollContainerRef]);

    return (
        <section 
            ref={sectionRef}
            id="projet" 
            className="relative bg-white/95 dark:bg-black/95 backdrop-blur-sm h-screen snap-start snap-always overflow-hidden z-10"
        >
            {/* Conteneur de défilement horizontal */}
            <div
                ref={scrollContainerRef}
                className={`h-full w-full flex overflow-x-auto scrollbar-hide snap-x snap-mandatory transition-opacity duration-100 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
                {sortedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {/* Indicateur de projets (desktop) */}
            <ProjectIndicator currentIndex={currentIndex} total={sortedProjects.length} />

            {/* Indicateur de défilement horizontal (mobile) */}
            <ProjectMobileIndicator
                currentIndex={currentIndex}
                total={sortedProjects.length}
                onItemClick={scrollToItem}
            />

            {/* Flèche pour passer à la section suivante */}
            <button
                onClick={() => {
                    const nextSection = document.getElementById("skills");
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hover:scale-110 transition-transform duration-200"
                aria-label="Aller à la section suivante"
            >
                <svg
                    className="w-8 h-8 text-violet-900 dark:text-violet-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </button>
        </section>
    );
}
