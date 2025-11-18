import type { Project } from "@/app/data/types";

/**
 * Trie les projets : projets professionnels en premier, puis projets personnels
 */
export function sortProjects(projects: Project[]): Project[] {
    return [...projects].sort((a, b) => {
        if (a.type === "pro" && b.type === "perso") return -1;
        if (a.type === "perso" && b.type === "pro") return 1;
        return 0;
    });
}

