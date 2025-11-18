"use client";

import type { Project } from "@/app/data/types";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="min-w-full h-full snap-start flex items-center justify-center px-8 md:px-16 lg:px-24">
            <div className="max-w-5xl w-full mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image ou placeholder */}
                    <div className="relative aspect-video bg-gradient-to-br from-violet-900/10 dark:from-violet-400/10 to-violet-600/5 dark:to-violet-500/5 rounded-lg overflow-hidden">
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
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
                        ) : project.is_abort === true ? (
                            <span className="absolute top-4 left-4 bg-red-500 dark:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
                                Abandonné
                            </span>
                        ) : project.is_abort === false ? (
                            <span className="absolute top-4 left-4 bg-green-500 dark:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
                                En cours
                            </span>
                        ) : null}
                    </div>

                    {/* Contenu */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black dark:text-white">
                                {project.title}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="bg-violet-900/10 dark:bg-violet-400/10 text-violet-900 dark:text-violet-400 border border-violet-900/20 dark:border-violet-400/20 px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Liens */}
                        <div className="flex gap-4 pt-4">
                            {project.github && project.github.trim() !== "" && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-violet-900 dark:bg-violet-950 text-white rounded-lg hover:bg-violet-800 dark:hover:bg-violet-900 transition-all duration-200 font-medium"
                                >
                                    GitHub
                                </a>
                            )}
                            {project.demo && project.demo.trim() !== "" && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 border-2 border-violet-900 dark:border-violet-800 text-violet-900 dark:text-violet-400 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-200 font-medium"
                                >
                                    Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

