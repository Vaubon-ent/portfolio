"use client";

export default function AboutSection() {
    return (
        <section id="about" className="relative bg-white/85 dark:bg-slate-900/85 h-screen snap-start snap-always flex items-center justify-center z-10">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center text-black dark:text-white">
                    Samuel VAUBON
                </h2>
                <div className="max-w-3xl mx-auto">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                        Depuis le début de mon voyage en tant que freelance, j'ai eu l'occasion de travailler en tant que développeur front-end et
                        backend-end. Je suis passionné par les nouvelles technologies et je suis constamment à la recherche de nouvelles opportunités.
                        J'aime créer des projets à partir de zéro, et donner vie aux idées d'autrui.
                    </p>
                </div>
            </div>
        </section>
    );
}