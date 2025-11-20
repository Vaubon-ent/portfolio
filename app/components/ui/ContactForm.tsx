"use client"; // Important : nécessaire pour utiliser les hooks React (useState, etc.)

import { useState } from "react";

// Exemple de composant avec état (state) et gestion d'événements
export default function ContactForm() {
  // useState est un "hook" React qui permet de gérer l'état d'un composant
  // [valeur, fonctionPourChangerLaValeur] = useState(valeurInitiale)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fonction qui s'exécute quand le formulaire est soumis
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      // Vérifier le type de contenu avant de parser
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Réponse non-JSON reçue:", text);
        throw new Error("Erreur serveur : réponse invalide");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi du message");
      }

      // Mettre à jour l'état pour afficher un message de confirmation
      setSubmitted(true);
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setMessage("");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full">
      <div className="space-y-6">
        <div>
          {/* <label 
            htmlFor="name" 
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nom
          </label> */}
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-violet-900 dark:focus:ring-violet-800 
                     focus:border-transparent bg-white dark:bg-gray-900 
                     text-black dark:text-white 
                     transition-all duration-200
                     placeholder:text-gray-400 dark:placeholder:text-gray-600
                     shadow-sm hover:shadow-md focus:shadow-lg"
            placeholder="Votre nom"
            required
          />
        </div>

        <div>
          {/* <label 
            htmlFor="email" 
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label> */}
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-violet-900 dark:focus:ring-violet-800 
                     focus:border-transparent bg-white dark:bg-gray-900 
                     text-black dark:text-white 
                     transition-all duration-200
                     placeholder:text-gray-400 dark:placeholder:text-gray-600
                     shadow-sm hover:shadow-md focus:shadow-lg"
            placeholder="votre.email@example.com"
            required
          />
        </div>

        <div>
          {/* <label 
            htmlFor="message" 
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Message
          </label> */}
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-violet-900 dark:focus:ring-violet-800 
                     focus:border-transparent bg-white dark:bg-gray-900 
                     text-black dark:text-white 
                     transition-all duration-200
                     placeholder:text-gray-400 dark:placeholder:text-gray-600
                     shadow-sm hover:shadow-md focus:shadow-lg
                     resize-none"
            rows={5}
            placeholder="Votre message..."
            required
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-violet-900 dark:bg-violet-950 text-white 
                     rounded-lg hover:bg-violet-800 dark:hover:bg-violet-900 
                     transition-all duration-200 font-medium
                     shadow-md hover:shadow-lg active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-900 dark:text-red-300 text-center font-medium">
              ✗ {error}
            </p>
          </div>
        )}

        {submitted && (
          <div className="mt-4 p-4 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-lg">
            <p className="text-sm text-violet-900 dark:text-violet-300 text-center font-medium">
              ✓ Message envoyé avec succès !
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

