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

  // Fonction qui s'exécute quand le formulaire est soumis
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Ici, vous pourriez envoyer les données à une API
    console.log({ name, email, message });
    
    // Mettre à jour l'état pour afficher un message de confirmation
    setSubmitted(true);
    
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block mb-2 font-medium">
          Nom
        </label>
        <input
          id="name"
          type="text"
          value={name} // La valeur est contrôlée par l'état React
          onChange={(e) => setName(e.target.value)} // Met à jour l'état quand l'utilisateur tape
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-2 font-medium">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Envoyer
      </button>

      {submitted && (
        <p className="text-green-600">Message envoyé avec succès !</p>
      )}
    </form>
  );
}

