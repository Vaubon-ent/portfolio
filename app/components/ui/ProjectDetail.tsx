"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Project } from "@/app/data/types";
import ProjectScrollbar from "./ProjectScrollbar";

interface ProjectDetailProps {
    project: Project;
    images?: string[];
}

export default function ProjectDetail({ project, images = [] }: ProjectDetailProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToPrevious = useCallback(() => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? images.length - 1 : prev - 1
        );
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentImageIndex((prev) => 
            prev === images.length - 1 ? 0 : prev + 1
        );
    }, [images.length]);

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    // Navigation au clavier
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (images.length === 0) return;
            
            if (e.key === "ArrowLeft") {
                goToPrevious();
            } else if (e.key === "ArrowRight") {
                goToNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [images.length, goToPrevious, goToNext]);

    return (
        <>
            <ProjectScrollbar />
            <div className="min-h-screen bg-white/95 dark:bg-black/95 backdrop-blur-sm">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link 
                            href={`/?project=${project.id}`}
                            className="text-lg font-semibold text-black dark:text-white hover:text-violet-900 dark:hover:text-violet-400 transition-colors"
                        >
                            ← Retour
                        </Link>
                        <div className="flex gap-4">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium text-sm"
                                >
                                    GitHub
                                </a>
                            )}
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-violet-900 dark:bg-violet-950 text-white rounded-lg hover:bg-violet-800 dark:hover:bg-violet-900 transition-all duration-200 font-medium text-sm"
                                >
                                    Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenu principal */}
            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* En-tête */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                                project.type === "pro" 
                                    ? "bg-violet-900 dark:bg-violet-950 text-white" 
                                    : "bg-violet-700 dark:bg-violet-800 text-white"
                            }`}>
                                {project.type === "pro" ? "Pro" : "Perso"}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black dark:text-white">
                            {project.title}
                        </h1>
                        {/* Tags technologies dans l'en-tête */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 rounded-full text-sm font-medium border border-violet-200 dark:border-violet-800"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Carousel d'images */}
                    {images.length > 0 ? (
                        <div className="mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black dark:text-white">
                                Captures d'écran
                            </h2>
                            
                            {/* Conteneur du carousel */}
                            <div className="relative max-w-4xl mx-auto">
                                {/* Image principale */}
                                <div className="relative aspect-[16/10] mb-4">
                                    <div className="relative w-full h-full">
                                        {images.map((imagePath, index) => (
                                            <img
                                                key={index}
                                                src={imagePath}
                                                alt={`${project.title} - Capture ${index + 1}`}
                                                className={`absolute inset-0 w-full h-full object-contain rounded-lg transition-opacity duration-500 ${
                                                    index === currentImageIndex 
                                                        ? "opacity-100" 
                                                        : "opacity-0"
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Bouton précédent */}
                                    {images.length > 1 && (
                                        <button
                                            onClick={goToPrevious}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-110"
                                            aria-label="Image précédente"
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

                                    {/* Bouton suivant */}
                                    {images.length > 1 && (
                                        <button
                                            onClick={goToNext}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-110"
                                            aria-label="Image suivante"
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

                                    {/* Compteur d'images */}
                                    {images.length > 1 && (
                                        <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 bg-black/60 dark:bg-white/60 backdrop-blur-sm rounded-full text-white dark:text-black text-sm font-medium">
                                            {currentImageIndex + 1} / {images.length}
                                        </div>
                                    )}
                                </div>

                                {/* Indicateurs (miniatures) */}
                                {images.length > 1 && (
                                    <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                                        {images.map((imagePath, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToImage(index)}
                                                className={`relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                                                    index === currentImageIndex
                                                        ? "ring-2 ring-violet-900 dark:ring-violet-400 scale-105"
                                                        : "opacity-60 hover:opacity-100"
                                                }`}
                                                aria-label={`Aller à l'image ${index + 1}`}
                                            >
                                                <img
                                                    src={imagePath}
                                                    alt={`Miniature ${index + 1}`}
                                                    className="w-full h-full object-contain rounded-lg"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : project.image ? (
                        <div className="relative max-w-2xl mx-auto aspect-[16/10] mb-12">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-contain rounded-lg"
                            />
                        </div>
                    ) : (
                        <div className="relative max-w-2xl mx-auto aspect-[16/10] mb-12">
                            <div className="w-full h-full flex items-center justify-center rounded-lg">
                                <div className="text-6xl opacity-20">
                                    {project.type === "pro" ? "💼" : "💻"}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Description détaillée */}
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black dark:text-white">
                            Description
                        </h2>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                            {project["description-plus"] ? project["description-plus"] : project.description}
                        </p>
                    </div>

                    {/* Problématique (si disponible) */}
                    {project.problématique && (
                        <div className="mb-12 p-6 bg-violet-50 dark:bg-violet-950/30 rounded-lg border border-violet-200 dark:border-violet-800">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">
                                Problématique
                            </h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                {project.problématique}
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
        </>
    );
}

