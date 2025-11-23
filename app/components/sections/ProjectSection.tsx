    "use client";

import { useState, useEffect, useRef, useCallback } from "react";
import projectsData from "@/app/data/projects.json";
import type { Project } from "@/app/data/types";
import { sortProjects } from "@/app/utils/projectUtils";
import { useHorizontalScroll } from "@/app/hooks/useHorizontalScroll";
import ProjectCard from "@/app/components/ui/ProjectCard";

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
    const isNavigating = useRef(false);
    
    // Auto-scroll
    const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
    const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const autoScrollDelayRef = useRef<NodeJS.Timeout | null>(null);
    const AUTO_SCROLL_DELAY = 5000; // 5 secondes entre chaque projet

    // Fonction pour naviguer vers le projet précédent
    const goToPreviousProject = useCallback(() => {
        if (isNavigating.current) return;
        
        // Si on est au premier projet, aller au dernier
        const prevIndex = currentIndex <= 0 ? sortedProjects.length - 1 : currentIndex - 1;
        
        isNavigating.current = true;
        scrollToItem(prevIndex);
        setTimeout(() => {
            isNavigating.current = false;
        }, 500);
        
        // Pause l'auto-scroll temporairement après une interaction utilisateur
        setIsAutoScrollPaused(true);
        if (autoScrollDelayRef.current) {
            clearTimeout(autoScrollDelayRef.current);
        }
        autoScrollDelayRef.current = setTimeout(() => {
            setIsAutoScrollPaused(false);
        }, 10000); // Reprend après 10 secondes d'inactivité
    }, [currentIndex, sortedProjects.length, scrollToItem]);

    // Fonction pour naviguer vers le projet suivant
    const goToNextProject = useCallback(() => {
        if (isNavigating.current) return;
        
        // Si on est au dernier projet, revenir au premier
        const nextIndex = currentIndex >= sortedProjects.length - 1 ? 0 : currentIndex + 1;
        
        isNavigating.current = true;
        scrollToItem(nextIndex);
        setTimeout(() => {
            isNavigating.current = false;
        }, 500);
        
        // Pause l'auto-scroll temporairement après une interaction utilisateur
        setIsAutoScrollPaused(true);
        if (autoScrollDelayRef.current) {
            clearTimeout(autoScrollDelayRef.current);
        }
        autoScrollDelayRef.current = setTimeout(() => {
            setIsAutoScrollPaused(false);
        }, 10000); // Reprend après 10 secondes d'inactivité
    }, [currentIndex, sortedProjects.length, scrollToItem]);

    // Gestion de la navigation au clavier (flèches gauche/droite)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const projetSection = document.getElementById("projet");
            if (!projetSection) return;

            // Vérifier si on est dans la section projet
            const sectionRect = projetSection.getBoundingClientRect();
            const isInSection =
                sectionRect.top <= window.innerHeight / 2 &&
                sectionRect.bottom >= window.innerHeight / 2;

            if (!isInSection) return;

            // Navigation avec les flèches gauche/droite
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                goToPreviousProject();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                goToNextProject();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [goToPreviousProject, goToNextProject]);

    // Auto-scroll horizontal
    useEffect(() => {
        const projetSection = sectionRef.current;
        if (!projetSection || sortedProjects.length <= 1) return;

        // Vérifier si on est dans la section projet
        const checkIfInSection = () => {
            const sectionRect = projetSection.getBoundingClientRect();
            return (
                sectionRect.top <= window.innerHeight / 2 &&
                sectionRect.bottom >= window.innerHeight / 2
            );
        };

        // Gérer le survol pour pauser l'auto-scroll
        const handleMouseEnter = () => {
            setIsAutoScrollPaused(true);
        };

        const handleMouseLeave = () => {
            setIsAutoScrollPaused(false);
        };

        projetSection.addEventListener("mouseenter", handleMouseEnter);
        projetSection.addEventListener("mouseleave", handleMouseLeave);

        // Auto-scroll
        const startAutoScroll = () => {
            if (autoScrollIntervalRef.current) {
                clearInterval(autoScrollIntervalRef.current);
            }

            autoScrollIntervalRef.current = setInterval(() => {
                // Ne pas auto-scroller si on est en train de naviguer, si c'est en pause, ou si on n'est pas dans la section
                if (isNavigating.current || isAutoScrollPaused || !checkIfInSection()) {
                    return;
                }

                // Passer au projet suivant (ou revenir au premier si on est au dernier)
                const nextIndex = currentIndex >= sortedProjects.length - 1 ? 0 : currentIndex + 1;
                isNavigating.current = true;
                scrollToItem(nextIndex);
                setTimeout(() => {
                    isNavigating.current = false;
                }, 500);
            }, AUTO_SCROLL_DELAY);
        };

        // Démarrer l'auto-scroll seulement si pas en pause
        if (!isAutoScrollPaused) {
            startAutoScroll();
        }

        return () => {
            projetSection.removeEventListener("mouseenter", handleMouseEnter);
            projetSection.removeEventListener("mouseleave", handleMouseLeave);
            if (autoScrollIntervalRef.current) {
                clearInterval(autoScrollIntervalRef.current);
            }
            if (autoScrollDelayRef.current) {
                clearTimeout(autoScrollDelayRef.current);
            }
        };
    }, [currentIndex, sortedProjects.length, scrollToItem, sectionRef, isAutoScrollPaused]);

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
            className="relative bg-white/85 dark:bg-slate-900/85 h-screen snap-start snap-always overflow-hidden z-10"
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

            {/* Flèche gauche pour naviguer vers le projet précédent */}
            {sortedProjects.length > 1 && (
                <button
                    onClick={goToPreviousProject}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 opacity-70 hover:opacity-100 hover:scale-110"
                    aria-label="Projet précédent"
                >
                    <svg
                        className="w-6 h-6 text-violet-900 dark:text-violet-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
            )}

            {/* Flèche droite pour naviguer vers le projet suivant */}
            {sortedProjects.length > 1 && (
                <button
                    onClick={goToNextProject}
                    className="absolute right-20 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 opacity-70 hover:opacity-100 hover:scale-110"
                    aria-label="Projet suivant"
                >
                    <svg
                        className="w-6 h-6 text-violet-900 dark:text-violet-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            )}
        </section>
    );
}
