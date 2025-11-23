"use client";

import Link from "next/link";
import type { Project } from "@/app/data/types";
import ProjectScrollbar from "./ProjectScrollbar";

interface ProjectDetailProps {
    project: Project;
    images?: string[];
}

export default function ProjectDetail({ project, images = [] }: ProjectDetailProps) {
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

                    {/* Galerie d'images */}
                    {images.length > 0 ? (
                        <div className="mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black dark:text-white">
                                Captures d'écran
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {images.map((imagePath, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-[16/10] bg-gradient-to-br from-violet-900/10 dark:from-violet-400/10 to-violet-600/5 dark:to-violet-500/5 rounded-lg overflow-hidden group cursor-pointer"
                                    >
                                        <img
                                            src={imagePath}
                                            alt={`${project.title} - Capture ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : project.image ? (
                        <div className="relative max-w-2xl mx-auto aspect-[16/10] bg-gradient-to-br from-violet-900/10 dark:from-violet-400/10 to-violet-600/5 dark:to-violet-500/5 rounded-lg overflow-hidden mb-12">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="relative max-w-2xl mx-auto aspect-[16/10] bg-gradient-to-br from-violet-900/10 dark:from-violet-400/10 to-violet-600/5 dark:to-violet-500/5 rounded-lg overflow-hidden mb-12">
                            <div className="w-full h-full flex items-center justify-center">
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

