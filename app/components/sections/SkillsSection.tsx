"use client";

export default function SkillSection() {
    return (
        <section id="skills">
            <div className="container mx-auto px-4 py-16">
                <p>Langage de programmation</p>
                <p>Front-end</p>
                <ul>
                    <li>Angular</li>
                    <li>React</li>
                    <li>Next.js</li>
                    <li>Bootstrap</li>
                    <li>Material UI</li>
                </ul>
                <p>Backend</p>
                <ul>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>Python (Flask, DataFrame)</li>
                    <li>SQL</li>
                </ul>
                <p>Autres</p>
                <ul>
                    <li>Git</li>
                    <li>Docker</li>
                    <li>Pytest</li>
                </ul>
            </div>
        </section>
    )
}