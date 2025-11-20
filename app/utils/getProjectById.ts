import projectsData from "@/app/data/projects.json";
import type { Project } from "@/app/data/types";

/**
 * Récupère un projet par son ID depuis le fichier JSON
 */
export function getProjectById(id: number): Project | null {
    const projects = projectsData as Project[];
    return projects.find(project => project.id === id) || null;
}

