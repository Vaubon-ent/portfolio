# Guide de déploiement sur Vercel

Vercel est effectivement **gratuit** pour les projets personnels et open source ! Voici comment déployer votre portfolio.

## 📋 Prérequis

1. Un compte GitHub, GitLab ou Bitbucket (gratuit)
2. Votre projet doit être poussé sur un repository Git

## 🚀 Étapes de déploiement

### Étape 1 : Préparer votre projet Git

Si vous n'avez pas encore initialisé Git :

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Faire votre premier commit
git commit -m "Initial commit - Portfolio ready for deployment"
```

### Étape 2 : Créer un repository sur GitHub

1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Donnez un nom à votre repository (ex: `portfolio`)
4. Choisissez **Public** ou **Private** (les deux fonctionnent avec Vercel gratuit)
5. **Ne cochez pas** "Initialize with README" (vous avez déjà des fichiers)
6. Cliquez sur **"Create repository"**

### Étape 3 : Pousser votre code sur GitHub

GitHub vous donnera des commandes, mais voici les étapes :

```bash
# Ajouter le remote GitHub (remplacez USERNAME et REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Renommer la branche principale en main (si nécessaire)
git branch -M main

# Pousser votre code
git push -u origin main
```

### Étape 4 : Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"** (ou GitLab/Bitbucket)
4. Autorisez Vercel à accéder à vos repositories

### Étape 5 : Déployer votre projet

1. Dans le dashboard Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Importez votre repository GitHub
3. Vercel détectera automatiquement que c'est un projet Next.js
4. **Configuration du projet :**
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (laisser par défaut)
   - **Build Command** : `npm run build` (par défaut)
   - **Output Directory** : `.next` (par défaut)
   - **Install Command** : `npm install` (par défaut)

### Étape 6 : Configurer les variables d'environnement

Avant de déployer, ajoutez vos variables d'environnement dans Vercel :

1. Dans la page de configuration du projet, allez dans **"Environment Variables"**
2. Ajoutez les variables suivantes :

```
RESEND_API_KEY = votre_clé_api_resend
RESEND_FROM_EMAIL = Portfolio <onboarding@resend.dev>
MY_MAIL = votre-email@example.com
```

**Optionnel** (pour les liens sociaux dans le footer) :
```
NEXT_PUBLIC_LINKEDIN_URL = https://linkedin.com/in/votre-profil
NEXT_PUBLIC_GITHUB_URL = https://github.com/votre-username
```

3. Cliquez sur **"Deploy"**

### Étape 7 : Attendre le déploiement

- Vercel va automatiquement :
  - Installer les dépendances (`npm install`)
  - Builder votre projet (`npm run build`)
  - Déployer votre site

- Le processus prend généralement **2-5 minutes**

### Étape 8 : Votre site est en ligne ! 🎉

Une fois le déploiement terminé, vous obtiendrez :
- Une URL gratuite : `https://votre-projet.vercel.app`
- Un certificat SSL automatique (HTTPS)
- Un déploiement automatique à chaque push sur GitHub

## 🔄 Déploiements automatiques

**C'est magique !** À chaque fois que vous poussez du code sur GitHub :
1. Vercel détecte automatiquement les changements
2. Rebuild et redéploie votre site
3. Votre site est mis à jour en quelques minutes

## 🌐 Utiliser votre propre domaine (optionnel)

1. Dans votre projet Vercel, allez dans **"Settings"** → **"Domains"**
2. Ajoutez votre domaine (ex: `www.votrenom.com`)
3. Suivez les instructions pour configurer les DNS
4. Vercel gère automatiquement le certificat SSL

## 📝 Variables d'environnement importantes

Assurez-vous d'avoir configuré ces variables dans Vercel :

| Variable | Description | Où l'obtenir |
|----------|-------------|--------------|
| `RESEND_API_KEY` | Clé API Resend pour les emails | [Resend.com](https://resend.com) → API Keys |
| `RESEND_FROM_EMAIL` | Email expéditeur | `Portfolio <onboarding@resend.dev>` (gratuit) |
| `MY_MAIL` | Votre email pour recevoir les messages | Votre email personnel |

## 🆓 Plan gratuit Vercel

Le plan gratuit inclut :
- ✅ Déploiements illimités
- ✅ 100 GB de bande passante/mois
- ✅ Certificats SSL automatiques
- ✅ Domaine personnalisé gratuit
- ✅ CDN global
- ✅ Builds automatiques

## 🐛 Dépannage

### Erreur de build
- Vérifiez les logs de build dans Vercel
- Assurez-vous que `npm run build` fonctionne localement
- Vérifiez que toutes les dépendances sont dans `package.json`

### Formulaire de contact ne fonctionne pas
- Vérifiez que les variables d'environnement sont bien configurées dans Vercel
- Vérifiez que `RESEND_API_KEY` est valide
- Consultez les logs dans Vercel → Functions

### Images ne s'affichent pas
- Vérifiez que les images sont bien dans le dossier `public/`
- Les chemins doivent commencer par `/` (ex: `/tnk/tnk.png`)
- Les images dans `public/` sont automatiquement servies par Next.js

### Carousel d'images vide
- La fonction `getProjectImages` utilise `fs` qui fonctionne uniquement au build time
- Sur Vercel, cela fonctionne car les pages sont des Server Components
- Si le carousel est vide, vérifiez que les dossiers d'images existent dans `public/`

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Support Vercel](https://vercel.com/support)

---

**Bon déploiement ! 🚀**

