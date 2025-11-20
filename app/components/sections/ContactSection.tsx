"use client";

import ContactForm from "../ui/ContactForm";
import FooterSection from "./FooterSection";

export default function ContactSection() {
    return (
        <>
            <section id="contact" className="relative bg-white/85 dark:bg-slate-900/85 h-screen snap-start snap-always flex flex-col items-center justify-center overflow-y-auto z-10">
                <div className="container mx-auto px-4 py-16 flex-1 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-12 text-center text-black dark:text-white">
                        Contact
                    </h2>
                    <ContactForm />
                </div>
                <FooterSection />
            </section>
        </>
    );
}