"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navigation() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const sections = [
        { id: "hero", label: "Accueil" },
        { id: "projet", label: "Projets" },
        { id: "skills", label: "Compétences" },
        { id: "about", label: "À propos" },
        { id: "contact", label: "Contact" },
    ];

    useEffect(() => {
        const main = document.querySelector("main");
        if (!main) return;

        // Fonction pour déterminer la section active basée sur le scroll
        const updateActiveSection = () => {
            const scrollPosition = main.scrollTop + main.clientHeight / 2;
            const sectionIds = sections.map(s => s.id);
            
            // Parcourir les sections de bas en haut pour trouver la première qui dépasse le scroll
            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const section = document.getElementById(sectionIds[i]);
                if (section) {
                    const sectionTop = section.offsetTop - (main as HTMLElement).offsetTop;
                    if (scrollPosition >= sectionTop) {
                        setActiveSection(sectionIds[i]);
                        break;
                    }
                }
            }
        };

        // Gestion de la visibilité du logo
        const handleScroll = () => {
            const hero = document.getElementById("hero");
            const heroHeight = hero?.offsetHeight || 0;
            setIsVisible(main.scrollTop < heroHeight - 100);
            updateActiveSection();
        };

        // Écouter le scroll pour la visibilité du logo et la section active
        main.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Appel initial

        return () => {
            main.removeEventListener("scroll", handleScroll);
        };
    }, [sections]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 0;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            {/* Logo minimaliste en haut à gauche */}
            <div
                className={`fixed top-8 left-8 z-50 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
                <button
                    onClick={() => scrollToSection("hero")}
                    className="text-lg font-semibold text-black dark:text-white hover:text-violet-900 dark:hover:text-violet-400 transition-colors"
                >
                    Samuel
                </button>
            </div>

            {/* Indicateurs de section (dots) sur le côté droit - Desktop */}
            <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block">
                <ul className="flex flex-col gap-4">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <button
                                onClick={() => scrollToSection(section.id)}
                                className="group relative flex items-center"
                                aria-label={section.label}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        activeSection === section.id
                                            ? "bg-violet-900 dark:bg-violet-400 w-3 h-3"
                                            : "bg-gray-400 dark:bg-gray-600 group-hover:bg-violet-600 dark:group-hover:bg-violet-500"
                                    }`}
                                />
                                <span
                                    className={`absolute right-6 whitespace-nowrap text-xs font-medium transition-all duration-300 ${
                                        activeSection === section.id
                                            ? "opacity-100 translate-x-0 text-violet-900 dark:text-violet-400"
                                            : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-gray-600 dark:text-gray-400"
                                    }`}
                                >
                                    {/* {section.label} */}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* ThemeToggle et Menu mobile - Bouton hamburger */}
            <div className="fixed top-8 right-8 z-50 flex items-center gap-3">
                <ThemeToggle />
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 md:hidden"
                    aria-label="Menu"
                >
                    <span
                        className={`w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                            isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                        }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                            isMobileMenuOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                            isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Menu mobile - Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-md z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <nav className="flex flex-col items-center justify-center h-full gap-8">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => {
                                    scrollToSection(section.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`text-2xl font-medium transition-colors ${
                                    activeSection === section.id
                                        ? "text-violet-900 dark:text-violet-400"
                                        : "text-gray-700 dark:text-gray-300 hover:text-violet-900 dark:hover:text-violet-400"
                                }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}

