"use client";

export default function BackgroundDecoration() {
    return (
        <div 
            className="fixed inset-0 pointer-events-none"
            style={{ 
                zIndex: 0, // Au-dessus du body mais sous les sections (z-10)
            }}
        >
            {/* Cercle violet en haut à droite */}
            <div 
                className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
                    transform: 'translate(30%, -30%)',
                }}
            ></div>
            
            {/* Cercle violet en bas à gauche */}
            <div 
                className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, transparent 70%)',
                    transform: 'translate(-30%, 30%)',
                }}
            ></div>
            
            {/* Grille de points subtile */}
            <div 
                className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                }}
            ></div>
        </div>
    );
}

