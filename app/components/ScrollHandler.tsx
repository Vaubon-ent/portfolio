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
        const sections = ["hero", "projet", "skills", "about", "contact"];

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

            // Navigation entre sections uniquement
            if (e.deltaY > 50) {
                // Scroll vers le bas - section suivante
                e.preventDefault();
                scrollToSection(currentSectionIndex + 1);
            } else if (e.deltaY < -50) {
                // Scroll vers le haut - section précédente
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

