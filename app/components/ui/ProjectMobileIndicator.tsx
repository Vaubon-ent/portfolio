"use client";

interface ProjectMobileIndicatorProps {
    currentIndex: number;
    total: number;
    onItemClick: (index: number) => void;
}

export default function ProjectMobileIndicator({
    currentIndex,
    total,
    onItemClick,
}: ProjectMobileIndicatorProps) {
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:hidden">
            <div className="flex gap-2">
                {Array.from({ length: total }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onItemClick(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentIndex === index
                                ? "bg-violet-900 dark:bg-violet-400 w-8"
                                : "bg-gray-400 dark:bg-gray-600"
                        }`}
                        aria-label={`Aller au projet ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

