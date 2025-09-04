# CASHTOK System - Contrats API Backend

## Vue d'ensemble
Ce document définit les contrats API et l'intégration frontend-backend pour la landing page CASHTOK System.

## Données Mock à Remplacer

### 1. Témoignages (testimonials)
**Fichier Mock**: `/src/mock.js` - `testimonials` array
**À implémenter**: 
- Collection MongoDB `testimonials`
- API GET `/api/testimonials` 
- Minimum 30 témoignages (15 par rangée défilante)

### 2. FAQ 
**Fichier Mock**: `/src/mock.js` - `faqData` array
**À implémenter**:
- Collection MongoDB `faqs`
- API GET `/api/faqs`

### 3. Analytics
**Fichier Mock**: `/src/mock.js` - `analyticsData` object
**À implémenter**:
- Collection MongoDB `analytics`
- API GET `/api/analytics/dashboard`
- Tracking des visites, conversions, sources de trafic

## Nouvelles Fonctionnalités à Ajouter

### 1. Capture d'Emails (Email Marketing)
**Endpoints**:
- POST `/api/emails/subscribe` - Inscription newsletter
- GET `/api/emails` - Liste des abonnés (admin)

**Données**:
```json
{
  "email": "user@example.com",
  "source": "hero_section|offers|footer",
  "timestamp": "2025-01-04T10:30:00Z",
  "interests": ["tiktok", "instagram", "youtube"]
}
```

### 2. Analytics & Tracking
**Endpoints**:
- POST `/api/analytics/track` - Enregistrer événement
- GET `/api/analytics/stats` - Statistiques globales

**Événements à tracker**:
- Page views
- Clics sur CTA
- Temps passé sur chaque section
- Source de trafic
- Device type (mobile/desktop)

### 3. Chat en Direct
**Endpoints**:
- POST `/api/chat/message` - Envoyer message
- GET `/api/chat/messages` - Récupérer historique
- WebSocket `/ws/chat` - Messages temps réel

### 4. Gestion des Leads
**Endpoints**:
- POST `/api/leads` - Nouveau lead intéressé
- GET `/api/leads` - Liste des leads (admin)

## Intégrations Frontend

### 1. Remplacement des Imports Mock
**Avant**:
```javascript
import { testimonials, faqData } from '../mock';
```

**Après**:
```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

const [testimonials, setTestimonials] = useState([]);
const [faqData, setFaqData] = useState([]);

useEffect(() => {
  fetchTestimonials();
  fetchFAQ();
}, []);
```

### 2. Composants à Modifier
- `TestimonialsSection.jsx` - Intégration API témoignages
- `FAQSection.jsx` - Intégration API FAQ  
- `HeroSection.jsx` - Ajout capture email
- `Footer.jsx` - Ajout newsletter signup
- Nouveau `ChatWidget.jsx` - Widget chat flottant
- Nouveau `Analytics.jsx` - Tracking automatique

### 3. Formulaires à Ajouter
- Newsletter signup dans Hero et Footer
- Formulaire de contact/démonstration
- Chat widget avec support

## Structure Backend

### Models MongoDB
1. `Testimonial` - Témoignages clients
2. `FAQ` - Questions fréquentes  
3. `EmailSubscriber` - Abonnés newsletter
4. `Analytics` - Données analytiques
5. `ChatMessage` - Messages chat
6. `Lead` - Prospects intéressés

### Middlewares
- CORS pour frontend
- Rate limiting pour APIs
- Validation des données
- Logging des requêtes

### Services
- EmailService - Gestion emails/newsletter
- AnalyticsService - Tracking et statistiques  
- ChatService - Chat temps réel
- LeadService - Gestion des prospects

## Sécurité & Performance
- Validation des inputs
- Rate limiting sur les APIs publiques
- Cache pour les données statiques (témoignages, FAQ)
- Monitoring des performances
- Backup automatique MongoDB

## Variables d'Environnement Nécessaires
- `MONGO_URL` - Connexion MongoDB (déjà configuré)
- `EMAIL_SERVICE_API_KEY` - Pour service d'emailing
- `CHAT_SECRET_KEY` - Sécurisation chat
- `ANALYTICS_SECRET` - Clé analytics