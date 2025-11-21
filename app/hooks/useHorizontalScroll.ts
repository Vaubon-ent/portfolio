import { useState, useEffect, useRef, RefObject } from "react";

interface UseHorizontalScrollOptions {
    totalItems: number;
}

interface UseHorizontalScrollReturn {
    currentIndex: number;
    scrollContainerRef: RefObject<HTMLDivElement>;
    sectionRef: RefObject<HTMLElement>;
    scrollToItem: (index: number) => void;
}

/**
 * Hook personnalisé pour gérer le défilement horizontal des projets
 */
export function useHorizontalScroll({
    totalItems,
}: UseHorizontalScrollOptions): UseHorizontalScrollReturn {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

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

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [totalItems]);

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

