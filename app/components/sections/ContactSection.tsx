"use client";

import ContactForm from "../ui/ContactForm";

export default function ContactSection() {
    return (
        <section id="contact">
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Contact</h2>
                <ContactForm />
            </div>
        </section>
    )
}