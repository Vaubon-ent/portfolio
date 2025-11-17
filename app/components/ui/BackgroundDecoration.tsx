"use client";

export default function BackgroundDecoration() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            {/* Cercle violet subtil en haut à droite */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-900/12 dark:bg-violet-400/12 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
            
            {/* Cercle violet subtil en bas à gauche */}
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-violet-900/12 dark:bg-violet-400/12 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
            
            {/* Lignes de grille très subtiles */}
            <div 
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(88, 28, 135, 0.04) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(88, 28, 135, 0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            ></div>
        </div>
    );
}

