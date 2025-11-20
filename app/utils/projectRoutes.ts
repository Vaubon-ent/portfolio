/**
 * Mappe les IDs de projets aux routes de pages
 */
export function getProjectRoute(projectId: number): string | null {
    const routeMap: Record<number, string> = {
        1: "/tnk",
        2: "/dashboard",
        3: "/local-llm",
    };
    
    return routeMap[projectId] || null;
}

/**
 * Récupère l'ID du projet depuis une route
 */
export function getProjectIdFromRoute(route: string): number | null {
    const routeToIdMap: Record<string, number> = {
        "/tnk": 1,
        "/dashboard": 2,
        "/local-llm": 3,
    };
    
    return routeToIdMap[route] || null;
}

