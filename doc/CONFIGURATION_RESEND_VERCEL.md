# Configuration Resend pour Vercel

## ✅ Bonne nouvelle : Votre code est déjà prêt !

Votre code utilise correctement les variables d'environnement, donc **aucune modification de code n'est nécessaire**. Il vous suffit de configurer Resend et Vercel.

---

## 📋 Ce qu'il faut faire

### 1. Dans votre compte Resend (rien à changer normalement)

Votre compte Resend fonctionne déjà en local, donc **aucune modification n'est nécessaire**. Cependant, vérifiez :

#### ✅ Vérifier votre clé API
1. Allez sur [resend.com](https://resend.com) → Dashboard
2. Allez dans **"API Keys"**
3. Vérifiez que vous avez une clé API valide (commence par `re_`)
4. Si vous n'en avez pas, créez-en une :
   - Cliquez sur **"Create API Key"**
   - Donnez un nom (ex: "Portfolio Vercel")
   - Copiez la clé (vous ne pourrez la voir qu'une seule fois !)

#### ✅ Vérifier l'email expéditeur
- **Option 1 (Recommandé pour production)** : Utiliser votre propre domaine
  - Allez dans **"Domains"** dans Resend
  - Ajoutez votre domaine (ex: `votrenom.com`)
  - Suivez les instructions pour configurer les DNS
  - Une fois vérifié, vous pourrez utiliser : `Portfolio <noreply@votrenom.com>`

- **Option 2 (Pour tester rapidement)** : Utiliser l'email de test Resend
  - Utilisez : `Portfolio <onboarding@resend.dev>`
  - ⚠️ **Limitation** : Cet email fonctionne mais peut avoir des limites

#### ✅ Aucune autre configuration nécessaire dans Resend
- Pas besoin de whitelist d'IPs (Vercel utilise des IPs dynamiques)
- Pas besoin de configuration spéciale pour Vercel
- Resend fonctionne automatiquement avec n'importe quelle plateforme

---

### 2. Dans Vercel (configuration des variables d'environnement)

C'est **la seule chose à faire** ! Ajoutez vos variables d'environnement dans Vercel :

#### Étape 1 : Accéder aux variables d'environnement
1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet
3. Allez dans **"Settings"** (Paramètres)
4. Cliquez sur **"Environment Variables"** dans le menu de gauche

#### Étape 2 : Ajouter les variables

Ajoutez ces **3 variables** :

| Variable | Valeur | Où la trouver |
|----------|--------|--------------|
| `RESEND_API_KEY` | `re_votre_cle_api_ici` | Dans Resend → API Keys |
| `RESEND_FROM_EMAIL` | `Portfolio <onboarding@resend.dev>` ou `Portfolio <noreply@votre-domaine.com>` | Votre choix (voir ci-dessus) |
| `MY_MAIL` | `votre-email@example.com` | Votre email où recevoir les messages |

#### Étape 3 : Sélectionner les environnements

Pour chaque variable, cochez :
- ✅ **Production**
- ✅ **Preview** (optionnel, pour tester)
- ✅ **Development** (optionnel, si vous testez en local sur Vercel)

#### Étape 4 : Redéployer

Après avoir ajouté les variables :
1. Allez dans **"Deployments"**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Cliquez sur **"Redeploy"**
4. Ou faites un nouveau commit sur GitHub (déploiement automatique)

---

## 🔍 Vérification du code

Votre code dans `app/api/contact/route.ts` utilise :
- ✅ `process.env.RESEND_API_KEY` → Correct
- ✅ `process.env.RESEND_FROM_EMAIL` → Correct
- ✅ `process.env.MY_MAIL` → Correct

**Aucune modification de code nécessaire !** 🎉

---

## 🧪 Tester après déploiement

1. Allez sur votre site Vercel (ex: `https://votre-projet.vercel.app`)
2. Remplissez le formulaire de contact
3. Envoyez un message de test
4. Vérifiez votre boîte mail (et les spams si nécessaire)

---

## ⚠️ Points importants

### Sécurité
- ✅ **Ne jamais** commiter vos clés API dans Git
- ✅ Les variables d'environnement dans Vercel sont sécurisées
- ✅ Votre `.env.local` reste local (déjà dans `.gitignore`)

### Limites Resend (plan gratuit)
- 100 emails/jour
- 3000 emails/mois
- Parfait pour un portfolio personnel !

### Si vous changez de domaine
Si vous ajoutez un domaine personnalisé sur Vercel et que vous voulez l'utiliser pour les emails :
1. Ajoutez le domaine dans Resend → Domains
2. Configurez les DNS selon les instructions Resend
3. Attendez la vérification (quelques minutes)
4. Mettez à jour `RESEND_FROM_EMAIL` dans Vercel avec le nouveau domaine

---

## 🐛 Dépannage

### Erreur "Configuration serveur incomplète"
- Vérifiez que `RESEND_API_KEY` est bien définie dans Vercel
- Redéployez après avoir ajouté les variables

### Erreur "Erreur lors de l'envoi de l'email"
- Vérifiez que `RESEND_FROM_EMAIL` utilise un domaine vérifié dans Resend
- Vérifiez les logs dans Vercel → Functions → Logs

### Email non reçu
- Vérifiez que `MY_MAIL` est correct dans Vercel
- Vérifiez les spams
- Vérifiez les logs Resend dans leur dashboard

---

## 📝 Résumé

**À faire :**
1. ✅ Vérifier votre clé API Resend
2. ✅ Ajouter 3 variables d'environnement dans Vercel
3. ✅ Redéployer

**À ne PAS faire :**
- ❌ Modifier le code
- ❌ Changer quoi que ce soit dans Resend (sauf si vous voulez ajouter un domaine)

**C'est tout !** 🚀

