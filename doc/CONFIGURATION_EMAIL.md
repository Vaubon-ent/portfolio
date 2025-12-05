# Configuration de l'envoi d'emails

Le formulaire de contact est maintenant configuré pour envoyer des emails via [Resend](https://resend.com).

## Étapes de configuration

### 1. Créer un compte Resend

1. Allez sur [https://resend.com](https://resend.com)
2. Créez un compte gratuit (100 emails/jour en gratuit)
3. Vérifiez votre email

### 2. Obtenir votre clé API

1. Dans le dashboard Resend, allez dans "API Keys"
2. Cliquez sur "Create API Key"
3. Donnez un nom à votre clé (ex: "Portfolio")
4. Copiez la clé API (elle commence par `re_`)

### 3. Ajouter un domaine (optionnel mais recommandé)

Pour utiliser votre propre domaine d'email :
1. Allez dans "Domains"
2. Ajoutez votre domaine
3. Suivez les instructions pour configurer les DNS

Sinon, vous pouvez utiliser `onboarding@resend.dev` pour les tests.

### 4. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Clé API Resend
RESEND_API_KEY=re_votre_cle_api_ici

# Email de l'expéditeur
# Si vous avez un domaine vérifié : Portfolio <noreply@votre-domaine.com>
# Sinon pour les tests : onboarding@resend.dev
RESEND_FROM_EMAIL=Portfolio <noreply@votre-domaine.com>

# Votre email où vous recevrez les messages
RESEND_TO_EMAIL=votre-email@example.com
```

### 5. Redémarrer le serveur de développement

```bash
npm run dev
```

## Test

1. Remplissez le formulaire de contact
2. Cliquez sur "Envoyer"
3. Vérifiez votre boîte mail (et les spams si nécessaire)

## Dépannage

- **Erreur 401** : Vérifiez que votre clé API est correcte
- **Erreur de domaine** : Assurez-vous que le domaine dans `RESEND_FROM_EMAIL` est vérifié dans Resend
- **Email non reçu** : Vérifiez les spams et que `RESEND_TO_EMAIL` est correct

## Alternative : Utiliser un autre service

Si vous préférez utiliser un autre service (SendGrid, Mailgun, etc.), modifiez le fichier `app/api/contact/route.ts` pour utiliser leur SDK.

