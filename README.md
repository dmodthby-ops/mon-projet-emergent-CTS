# Here are your Instructions
# CASHTOK System - Documentation Complète

## 📖 Vue d'ensemble

CASHTOK System est une landing page complète pour vendre des formations de monétisation sur TikTok, Instagram et YouTube. Le site comprend un frontend React moderne avec un backend FastAPI et une base de données MongoDB.

## 🏗️ Architecture du Site

### Frontend (React)
- **Framework**: React 19 avec Vite
- **Styles**: Tailwind CSS + Shadcn/UI components
- **Routage**: React Router DOM
- **HTTP**: Axios pour les appels API
- **État**: React Hooks (useState, useEffect)

### Backend (FastAPI)
- **Framework**: FastAPI (Python)
- **Base de données**: MongoDB avec Motor (async)
- **Authentification**: JWT (préparé pour implémentation future)
- **CORS**: Configuré pour accepter les requêtes frontend

### Services Intégrés
- ✅ **Email Marketing**: Capture et gestion des abonnés newsletter
- ✅ **Analytics**: Tracking des visites, clics, conversions
- ✅ **Chat en Direct**: Widget de chat avec auto-réponses
- ✅ **Gestion des Leads**: Capture et qualification des prospects

## 📁 Structure des Fichiers

### Frontend (/app/frontend/src/)

```
├── components/
│   ├── ui/                 # Composants Shadcn/UI (calendar, button, etc.)
│   ├── Header.jsx          # Navigation principale avec scroll smooth
│   ├── HeroSection.jsx     # Section héros avec CTA
│   ├── OffersSection.jsx   # 2 offres (97€ et 297€)
│   ├── TestimonialsSection.jsx  # Témoignages défilants (30 témoignages)
│   ├── FAQSection.jsx      # FAQ avec accordéon
│   ├── UrgencySection.jsx  # Compteur + urgence
│   ├── Footer.jsx          # Footer complet
│   ├── ChatWidget.jsx      # Widget chat flottant
│   ├── NewsletterSignup.jsx # Formulaire newsletter
│   └── AnalyticsTracker.jsx # Tracking automatique
├── mock.js                 # Données de démonstration (30 témoignages)
├── App.js                  # Composant principal
├── App.css                 # Styles globaux
└── index.css              # Styles Tailwind
```

### Backend (/app/backend/)

```
├── server.py              # Serveur FastAPI principal
├── models.py              # Modèles Pydantic (Testimonial, FAQ, etc.)
├── services.py            # Services business (TestimonialService, etc.)
├── routes.py              # Routes API (/api/*)
├── database.py            # Initialisation DB + seed data
└── requirements.txt       # Dépendances Python
```

## 🎨 Guide de Personnalisation

### 1. Modifier les Logos des Réseaux Sociaux

**Fichier**: `/app/frontend/src/components/HeroSection.jsx`
**Lignes**: 75-95

```jsx
{/* Platform Logos */}
<div className="flex items-center space-x-6 py-4">
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
      <span className="text-white text-xs font-bold">TT</span>
    </div>
    <span className="text-sm text-gray-600">TikTok</span>
  </div>
  {/* Modifier ici pour changer les logos */}
</div>
```

**Pour changer**: Remplacer les `<span>` par des images ou des icônes SVG.

### 2. Modifier les Textes du Site

#### Titre Principal
**Fichier**: `/app/frontend/src/components/HeroSection.jsx`
**Lignes**: 54-70
```jsx
<h1 className="text-4xl md:text-6xl font-bold leading-tight">
  <span className="bg-gradient-to-r from-pink-600 via-red-500 to-blue-600 bg-clip-text text-transparent">
    Transformez
  </span>
  {/* Modifier les textes ici */}
</h1>
```

#### Description
**Ligne**: 78-82
```jsx
<p className="text-xl text-gray-600 leading-relaxed max-w-xl">
  Découvrez les méthodes secrètes pour monétiser vos réseaux sociaux...
</p>
```

### 3. Modifier les Prix des Offres

**Fichier**: `/app/frontend/src/components/OffersSection.jsx`

#### Offre 1 (Formation)
**Lignes**: 65-75
```jsx
<div className="flex items-center justify-center space-x-2">
  <span className="text-3xl font-bold text-gray-900">97€</span>
  <div className="text-right">
    <div className="text-lg text-gray-500 line-through">167€</div>
    <div className="text-sm text-green-600 font-semibold">-42% de réduction</div>
  </div>
</div>
```

#### Offre 2 (Premium)
**Lignes**: 175-185 (similaire)

### 4. Modifier les Témoignages

**Fichier**: `/app/frontend/src/mock.js`
**Lignes**: 1-300+

Pour ajouter/modifier un témoignage:
```javascript
{
  id: 31,
  name: "Nouveau Nom",
  image: "https://nouvelle-image.jpg",
  text: "Nouveau témoignage...",
  platform: "TikTok|Instagram|YouTube|Multi-plateformes",
  revenue: "X XXX€/mois",
  rating: 5
}
```

### 5. Modifier les Questions FAQ

**Fichier**: `/app/frontend/src/mock.js` OU **Base de données**
**Lignes**: 305-350

```javascript
{
  id: 7,
  question: "Nouvelle question ?",
  answer: "Nouvelle réponse détaillée..."
}
```

### 6. Personnaliser les Couleurs

**Fichier**: `/app/frontend/tailwind.config.js`
**Variables CSS**: `/app/frontend/src/index.css`

#### Couleurs principales utilisées:
- **Rose/Pink**: `from-pink-500 to-red-500`
- **Bleu**: `from-blue-500 to-purple-500`
- **Vert**: `from-green-500 to-blue-500`

#### Pour changer:
```css
:root {
  --primary-gradient: linear-gradient(45deg, #your-color-1, #your-color-2);
}
```

### 7. Modifier le Logo CASHTOK

**Fichier**: `/app/frontend/src/components/Header.jsx`
**Lignes**: 35-50

```jsx
<div className="flex items-center space-x-2">
  <div className="relative">
    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-600 rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform">
      <Zap className="w-6 h-6 text-white" />
    </div>
    {/* Remplacer par votre logo */}
  </div>
</div>
```

### 8. Configurer les Liens de Paiement

**Fichier**: `/app/frontend/src/components/OffersSection.jsx`
**Lignes**: 18-22

```jsx
const handlePayment = (offer, price) => {
  // Remplacer par vos vrais liens Stripe/PayPal
  window.location.href = `https://your-payment-link.com/checkout?offer=${offer}&price=${price}`;
};
```

## 🔧 APIs et Endpoints

### Endpoints Disponibles

#### Témoignages
- `GET /api/testimonials` - Récupérer tous les témoignages
- `POST /api/testimonials` - Créer un témoignage (admin)

#### FAQ
- `GET /api/faqs` - Récupérer toutes les FAQ
- `POST /api/faqs` - Créer une FAQ (admin)

#### Email Marketing
- `POST /api/emails/subscribe` - Inscription newsletter
- `GET /api/emails` - Liste des abonnés (admin)
- `GET /api/emails/stats` - Statistiques emails

#### Analytics
- `POST /api/analytics/track` - Tracker un événement
- `GET /api/analytics/stats` - Statistiques globales

#### Chat
- `POST /api/chat/message` - Envoyer un message
- `GET /api/chat/messages/{session_id}` - Messages d'une session
- `GET /api/chat/unread` - Messages non lus (admin)

#### Leads
- `POST /api/leads` - Créer un lead
- `GET /api/leads` - Liste des leads (admin)

### Base de Données MongoDB

#### Collections:
- `testimonials` - Témoignages clients
- `faqs` - Questions fréquentes
- `email_subscribers` - Abonnés newsletter
- `analytics_events` - Événements de tracking
- `chat_messages` - Messages du chat
- `leads` - Prospects commerciaux

## 🚀 Guide de Déploiement

### Option 1: Netlify (Gratuit)

#### Frontend uniquement (site statique):

1. **Préparer le build**:
```bash
cd /app/frontend
npm run build
```

2. **Déployer sur Netlify**:
   - Aller sur [netlify.com](https://netlify.com)
   - Drag & drop le dossier `build/`
   - OU connecter votre repo GitHub

3. **Variables d'environnement**:
   - `REACT_APP_BACKEND_URL=https://votre-backend.herokuapp.com`

#### Avec Backend (Netlify Functions):
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option 2: Vercel (Recommandé)

#### Frontend:

1. **Connecter le repo**:
   - Aller sur [vercel.com](https://vercel.com)
   - Import your Git repository
   - Sélectionner le dossier `/frontend`

2. **Configuration Build**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install"
}
```

3. **Variables d'environnement**:
```
REACT_APP_BACKEND_URL=https://votre-backend.railway.app
```

#### Backend:

1. **Railway (gratuit)**:
   - Aller sur [railway.app](https://railway.app)
   - Connect GitHub repo
   - Déployer le dossier `/backend`

2. **Variables d'environnement Railway**:
```
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/cashtok
DB_NAME=cashtok
PORT=8001
```

### Option 3: Render (Full-Stack)

#### Backend:
```yaml
# render.yaml
services:
  - type: web
    name: cashtok-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn server:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: MONGO_URL
        value: your-mongodb-connection-string
```

#### Frontend:
```yaml
  - type: web
    name: cashtok-frontend
    env: node
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: REACT_APP_BACKEND_URL
        value: https://cashtok-backend.onrender.com
```

### MongoDB Atlas (Base de Données)

1. **Créer un cluster**:
   - Aller sur [mongodb.com/atlas](https://mongodb.com/atlas)
   - Créer un cluster gratuit (512MB)

2. **Configurer l'accès**:
   - Whitelist your IP: `0.0.0.0/0` (ou IPs spécifiques)
   - Créer un utilisateur database

3. **Connection String**:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cashtok?retryWrites=true&w=majority
```

## 📊 Analytics et Monitoring

### Événements Trackés Automatiquement:
- ✅ **Page views** - Visites de pages
- ✅ **Section views** - Vues des sections 
- ✅ **CTA clicks** - Clics sur boutons
- ✅ **Scroll depth** - Profondeur de scroll (25%, 50%, 75%, 90%)
- ✅ **Time spent** - Temps passé sur le site
- ✅ **Email signups** - Inscriptions newsletter
- ✅ **Chat messages** - Messages du chat
- ✅ **Device type** - Type d'appareil (mobile/desktop)

### Dashboard Admin (À implémenter):
```javascript
// Exemple d'utilisation
const stats = await fetch('/api/analytics/stats').then(r => r.json());
console.log(stats);
// Output:
// {
//   total_visitors: 1250,
//   conversion_rate: 4.8,
//   popular_sections: [...],
//   device_breakdown: {...}
// }
```

## 🛠️ Maintenance et Support

### Logs Backend:
```bash
# Vérifier les logs du serveur
tail -f /var/log/supervisor/backend.*.log

# Redémarrer les services
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
```

### Base de Données:
```javascript
// Ajouter des témoignages via MongoDB
db.testimonials.insertOne({
  name: "Nouveau Client",
  text: "Témoignage...",
  platform: "TikTok",
  revenue: "2000€/mois",
  rating: 5,
  is_active: true
});
```

### Updates du Site:
1. Modifier les fichiers sources
2. Tester localement
3. Commit & push vers Git
4. Déploiement automatique (selon la plateforme)

## 📞 Support et Contact

Pour toute question sur cette documentation ou le site CASHTOK:
- 📧 Email: support@cashtok.com
- 💬 Chat: Widget intégré sur le site
- 📱 Téléphone: +33 1 23 45 67 89

---

*Documentation créée pour CASHTOK System v1.0 - Janvier 2025*
