import { useState, useEffect, useRef, RefObject } from "react";

interface UseHorizontalScrollOptions {
    totalItems: number;
    scrollDuration?: number;
}

interface UseHorizontalScrollReturn {
    currentIndex: number;
    scrollContainerRef: RefObject<HTMLDivElement>;
    sectionRef: RefObject<HTMLElement>;
    scrollToItem: (index: number) => void;
}

/**
 * Hook personnalisé pour gérer le défilement horizontal avec conversion du scroll vertical
 */
export function useHorizontalScroll({
    totalItems,
    scrollDuration = 800,
}: UseHorizontalScrollOptions): UseHorizontalScrollReturn {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isScrollingRef = useRef(false);

    useEffect(() => {
        const container = scrollContainerRef.current;
        const section = sectionRef.current;
        if (!container || !section) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const containerWidth = container.clientWidth;
            const itemIndex = Math.round(scrollLeft / containerWidth);
            setCurrentIndex(itemIndex);
        };

        container.addEventListener("scroll", handleScroll);
        handleScroll(); // Appel initial

        // Intercepter le scroll vertical pour le convertir en scroll horizontal
        const handleWheel = (e: WheelEvent) => {
            const main = document.querySelector("main");
            if (!main) return;

            // Vérifier si on est bien dans la section
            const sectionRect = section.getBoundingClientRect();
            const isInSection =
                sectionRect.top <= window.innerHeight / 2 &&
                sectionRect.bottom >= window.innerHeight / 2;

            if (!isInSection) return;

            // Vérifier si on est en train de scroller
            if (isScrollingRef.current) {
                e.preventDefault();
                return;
            }

            const containerWidth = container.clientWidth;
            const currentScrollLeft = container.scrollLeft;
            const currentIndex = Math.round(currentScrollLeft / containerWidth);

            // Scroll vers le bas
            if (e.deltaY > 50) {
                e.preventDefault();

                // Si on est sur le dernier item, permettre le scroll vers la section suivante
                if (currentIndex >= totalItems - 1) {
                    return;
                }

                // Sinon, scroller vers l'item suivant
                isScrollingRef.current = true;
                const nextIndex = Math.min(currentIndex + 1, totalItems - 1);
                container.scrollTo({
                    left: nextIndex * containerWidth,
                    behavior: "smooth",
                });

                setTimeout(() => {
                    isScrollingRef.current = false;
                }, scrollDuration);
            }
            // Scroll vers le haut
            else if (e.deltaY < -50) {
                e.preventDefault();

                // Si on est sur le premier item, permettre le scroll vers la section précédente
                if (currentIndex <= 0) {
                    return;
                }

                // Sinon, scroller vers l'item précédent
                isScrollingRef.current = true;
                const prevIndex = Math.max(currentIndex - 1, 0);
                container.scrollTo({
                    left: prevIndex * containerWidth,
                    behavior: "smooth",
                });

                setTimeout(() => {
                    isScrollingRef.current = false;
                }, scrollDuration);
            }
        };

        // Écouter le scroll sur la section
        section.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            container.removeEventListener("scroll", handleScroll);
            section.removeEventListener("wheel", handleWheel);
        };
    }, [totalItems, scrollDuration]);

    const scrollToItem = (index: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const containerWidth = container.clientWidth;
        container.scrollTo({
            left: index * containerWidth,
            behavior: "smooth",
        });
    };

    return {
        currentIndex,
        scrollContainerRef,
        sectionRef,
        scrollToItem,
    };
}

