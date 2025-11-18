"use client";

import { useState } from "react";
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

    // Trier les projets : pro en premier, puis perso
    const sortedProjects = sortProjects(projects);

    // Utiliser le hook pour gérer le scroll horizontal
    const { currentIndex, scrollContainerRef, sectionRef, scrollToItem } =
        useHorizontalScroll({
            totalItems: sortedProjects.length,
        });

    return (
        <section 
            ref={sectionRef}
            id="projet" 
            className="relative bg-white/95 dark:bg-black/95 backdrop-blur-sm h-screen snap-start snap-always overflow-hidden z-10"
        >
            {/* Conteneur de défilement horizontal */}
            <div
                ref={scrollContainerRef}
                className="h-full w-full flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
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
        </section>
    );
}
