"use client";

export default function SkillSection() {
    const skills = {
        frontend: [
            { name: "Angular" },
            { name: "React" },
            { name: "Next.js" },
            { name: "Bootstrap" },
            { name: "Material UI" },
        ],
        backend: [
            { name: "Node.js" },
            { name: "Express" },
            { name: "Python (Flask, DataFrame)" },
            { name: "SQL" },
        ],
        autres: [
            { name: "Git" },
            { name: "Docker" },
            { name: "Pytest" },
        ],
    };

    return (
        <section id="skills" className="relative bg-white/85 dark:bg-slate-900/85 h-screen snap-start snap-always flex items-center justify-center overflow-y-auto z-10">
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center text-black dark:text-white">
                    Compétences
                </h2>
                
                <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-12 max-w-5xl mx-auto">
                    {/* Front-end */}
                    <div className="flex-1 flex flex-col items-center max-w-xs">
                        <h3 className="text-xl font-semibold mb-6 text-black dark:text-white">
                            Front-end
                        </h3>
                        <div className="flex flex-wrap gap-3 justify-center w-full">
                            {skills.frontend.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-violet-900 dark:bg-violet-950 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Séparateur 1 */}
                    <div className="hidden md:block w-px min-h-[250px] bg-gradient-to-b from-transparent via-violet-900/50 dark:via-violet-800/50 to-transparent"></div>

                    {/* Backend */}
                    <div className="flex-1 flex flex-col items-center max-w-xs">
                        <h3 className="text-xl font-semibold mb-6 text-black dark:text-white">
                            Backend
                        </h3>
                        <div className="flex flex-wrap gap-3 justify-center w-full">
                            {skills.backend.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-violet-900 dark:bg-violet-950 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Séparateur 2 */}
                    <div className="hidden md:block w-px min-h-[250px] bg-gradient-to-b from-transparent via-violet-900/50 dark:via-violet-800/50 to-transparent"></div>

                    {/* Autres */}
                    <div className="flex-1 flex flex-col items-center max-w-xs">
                        <h3 className="text-xl font-semibold mb-6 text-black dark:text-white">
                            Autres
                        </h3>
                        <div className="flex flex-wrap gap-3 justify-center w-full">
                            {skills.autres.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-violet-900 dark:bg-violet-950 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}