"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Vérifier d'abord si la classe dark est déjà présente (depuis le script inline)
        const root = document.documentElement;
        const hasDarkClass = root.classList.contains("dark");
        
        // Vérifier la préférence système ou le localStorage
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        
        // Utiliser le thème sauvegardé, sinon celui détecté par la classe, sinon la préférence système
        const initialTheme = savedTheme || (hasDarkClass ? "dark" : systemTheme);
        
        setTheme(initialTheme);
        // S'assurer que le thème est appliqué (au cas où il y aurait une incohérence)
        applyTheme(initialTheme);
    }, []);

    const applyTheme = (newTheme: "light" | "dark") => {
        const root = document.documentElement;
        if (newTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", newTheme);
        // Debug: vérifier que la classe est bien appliquée
        console.log("Theme appliqué:", newTheme, "Classe dark présente:", root.classList.contains("dark"));
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    // Éviter le flash de contenu non stylé
    if (!mounted) {
        return (
            <button
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black transition-colors"
                aria-label="Changer le thème"
            >
                <span className="w-5 h-5">🌓</span>
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
            aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
        >
            {theme === "light" ? (
                // Icône lune pour passer en dark mode
                <svg
                    className="w-5 h-5 text-gray-700 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            ) : (
                // Icône soleil pour passer en light mode
                <svg
                    className="w-5 h-5 text-gray-700 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            )}
        </button>
    );
}

