"use client";

interface ProjectIndicatorProps {
    currentIndex: number;
    total: number;
}

export default function ProjectIndicator({ currentIndex, total }: ProjectIndicatorProps) {
    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
            {Array.from({ length: total }).map((_, index) => (
                <div
                    key={index}
                    className="relative flex items-center group"
                >
                    <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentIndex === index
                                ? "bg-violet-900 dark:bg-violet-400 w-3 h-3"
                                : "bg-gray-400 dark:bg-gray-600 group-hover:bg-violet-600 dark:group-hover:bg-violet-500"
                        }`}
                    />
                    <span
                        className={`absolute right-6 whitespace-nowrap text-xs font-medium transition-all duration-300 ${
                            currentIndex === index
                                ? "opacity-100 translate-x-0 text-violet-900 dark:text-violet-400"
                                : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-gray-600 dark:text-gray-400"
                        }`}
                    >
                        {/* {index + 1} */}
                    </span>
                </div>
            ))}
        </div>
    );
}

