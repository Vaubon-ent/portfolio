"use client";

import { useEffect } from "react";

/**
 * Composant qui applique une scrollbar personnalisée violette
 * Utilisé uniquement dans les pages de détails des projets
 */
export default function ProjectScrollbar() {
    useEffect(() => {
        // Ajouter la classe personnalisée au body et html quand le composant est monté
        document.body.classList.add("project-detail-scrollbar");
        document.documentElement.classList.add("project-detail-scrollbar");

        // Nettoyer en retirant la classe quand le composant est démonté
        return () => {
            document.body.classList.remove("project-detail-scrollbar");
            document.documentElement.classList.remove("project-detail-scrollbar");
        };
    }, []);

    return null;
}

