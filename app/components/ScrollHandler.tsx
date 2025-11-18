"use client";

import { useEffect, useRef } from "react";

export default function ScrollHandler() {
    const isScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const mainRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const main = document.querySelector("main");
        if (!main) return;

        mainRef.current = main as HTMLElement;
        const sections = ["hero", "about", "skills", "projet", "contact"];

        const getCurrentSectionIndex = (): number => {
            const scrollPosition = main.scrollTop + main.clientHeight / 2;
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section) {
                    const sectionTop = section.offsetTop - main.offsetTop;
                    if (scrollPosition >= sectionTop) {
                        return i;
                    }
                }
            }
            return 0;
        };

        const scrollToSection = (index: number) => {
            if (index < 0 || index >= sections.length || isScrolling.current) return;
            
            const section = document.getElementById(sections[index]);
            if (section && main) {
                isScrolling.current = true;
                section.scrollIntoView({ behavior: "smooth", block: "start" });
                
                // Réinitialiser le flag après l'animation
                if (scrollTimeout.current) {
                    clearTimeout(scrollTimeout.current);
                }
                scrollTimeout.current = setTimeout(() => {
                    isScrolling.current = false;
                }, 800);
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) {
                e.preventDefault();
                return;
            }

            const currentSectionIndex = getCurrentSectionIndex();
            const currentSectionId = sections[currentSectionIndex];

            // Si on est dans la section projets, laisser ProjectSection gérer le scroll
            if (currentSectionId === "projet") {
                const projetSection = document.getElementById("projet");
                if (projetSection) {
                    const sectionRect = projetSection.getBoundingClientRect();
                    const isInSection = sectionRect.top <= window.innerHeight / 2 && 
                                       sectionRect.bottom >= window.innerHeight / 2;
                    
                    if (isInSection) {
                        // Vérifier si on est sur le dernier projet (scroll bas) ou premier projet (scroll haut)
                        const scrollContainer = projetSection.querySelector('[class*="overflow-x-auto"]') as HTMLElement;
                        if (scrollContainer) {
                            const containerWidth = scrollContainer.clientWidth;
                            const currentScrollLeft = scrollContainer.scrollLeft;
                            const currentProjectIndex = Math.round(currentScrollLeft / containerWidth);
                            
                            // Compter le nombre de projets (approximation basée sur la largeur totale)
                            const totalWidth = scrollContainer.scrollWidth;
                            const totalProjects = Math.round(totalWidth / containerWidth);
                            
                            // Scroll vers le bas : ne permettre que si on est sur le dernier projet
                            if (e.deltaY > 50) {
                                if (currentProjectIndex < totalProjects - 1) {
                                    // Laisser ProjectSection gérer
                                    return;
                                }
                            }
                            // Scroll vers le haut : ne permettre que si on est sur le premier projet
                            else if (e.deltaY < -50) {
                                if (currentProjectIndex > 0) {
                                    // Laisser ProjectSection gérer
                                    return;
                                }
                            }
                        }
                    }
                }
            }

            if (e.deltaY > 50) {
                // Scroll vers le bas
                e.preventDefault();
                scrollToSection(currentSectionIndex + 1);
            } else if (e.deltaY < -50) {
                // Scroll vers le haut
                e.preventDefault();
                scrollToSection(currentSectionIndex - 1);
            }
        };

        // Écouter les événements de scroll sur le main
        main.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            main.removeEventListener("wheel", handleWheel);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    return null;
}

