"use client";

export default function HeroSection() {
    return (
        <section id="hero" className="relative bg-white/85 dark:bg-slate-900/85 h-screen snap-start snap-always flex items-center justify-center z-10">
            <div className="container mx-auto px-4 py-24 md:py-32 text-center">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black dark:text-white">
                    Développeur fullstack
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
                    Je suis un développeur fullstack créatif et passionné par les nouvelles technologies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* <a
                        href="#projet"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#projet")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-6 py-3 bg-violet-900 dark:bg-violet-950 text-white rounded-lg hover:bg-violet-800 dark:hover:bg-violet-900 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                        Voir mes projets
                    </a> */}
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-6 py-3 border-2 border-violet-900 dark:border-violet-800 text-violet-900 dark:text-violet-400 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-200 font-medium"
                    >
                        Me contacter
                    </a>
                </div>
            </div>
        </section>
    );
}