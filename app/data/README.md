# Format des données de projets

Ce fichier décrit le format JSON utilisé pour stocker les informations des projets.

## Structure d'un projet

```json
{
  "id": 1,
  "title": "Titre du projet",
  "description": "Description détaillée du projet",
  "technologies": ["React", "Node.js", "TypeScript"],
  "image": "chemin/vers/image.jpg" ou null,
  "github": "https://github.com/username/repo" ou null,
  "demo": "https://demo.com" ou null,
  "type": "pro" ou "perso"
}
```

## Champs détaillés

- **id** (number, requis) : Identifiant unique du projet
- **title** (string, requis) : Titre du projet
- **description** (string, requis) : Description du projet (peut être longue)
- **technologies** (array de strings, requis) : Liste des technologies utilisées
- **image** (string | null, optionnel) : Chemin vers l'image du projet (dans `/public` ou URL externe). Si `null`, un emoji sera affiché
- **github** (string | null, optionnel) : Lien vers le repository GitHub. Si `null`, le bouton GitHub ne sera pas affiché
- **demo** (string | null, optionnel) : Lien vers la démo en ligne. Si `null`, le bouton Demo ne sera pas affiché
- **type** ("pro" | "perso", requis) : Type de projet
  - `"pro"` : Projet professionnel (sera affiché en premier avec un badge "Pro")
  - `"perso"` : Projet personnel

## Exemple complet

```json
[
  {
    "id": 1,
    "title": "Application E-commerce",
    "description": "Plateforme complète de vente en ligne avec gestion de panier, paiement et administration.",
    "technologies": ["React", "Node.js", "Express", "MongoDB"],
    "image": "/images/projects/ecommerce.jpg",
    "github": "https://github.com/username/ecommerce",
    "demo": "https://ecommerce-demo.com",
    "type": "pro"
  },
  {
    "id": 2,
    "title": "Dashboard Analytics",
    "description": "Tableau de bord interactif pour visualiser et analyser des données en temps réel.",
    "technologies": ["Next.js", "TypeScript", "Chart.js"],
    "image": null,
    "github": "https://github.com/username/dashboard",
    "demo": null,
    "type": "perso"
  }
]
```

## Notes importantes

- Les projets sont automatiquement triés : les projets "pro" apparaissent en premier
- Pour les images, vous pouvez utiliser :
  - Un chemin relatif depuis le dossier `public` : `/images/project.jpg`
  - Une URL externe : `https://example.com/image.jpg`
  - `null` pour afficher un emoji par défaut (💼 pour pro, 💻 pour perso)
- Les projets sont affichés dans l'ordre du tableau JSON, mais triés par type (pro puis perso)

