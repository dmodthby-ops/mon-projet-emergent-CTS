import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const NewsletterSignup = ({ source = "unknown", variant = "default", className = "" }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      await axios.post(`${API}/emails/subscribe`, {
        email: email.trim(),
        source,
        interests: ['tiktok', 'instagram', 'youtube']
      });

      setIsSubscribed(true);
      setEmail('');

      // Track analytics
      try {
        await axios.post(`${API}/analytics/track`, {
          event_type: 'newsletter_signup',
          page: '/',
          section: source,
          additional_data: { source }
        });
      } catch (analyticsError) {
        console.log('Analytics tracking failed:', analyticsError);
      }

    } catch (error) {
      console.error('Newsletter signup error:', error);
      if (error.response?.status === 422) {
        setError('Email invalide. Veuillez vérifier votre saisie.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-2xl p-6 text-center ${className}`}>
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">
          Inscription confirmée ! 🎉
        </h3>
        <p className="text-green-700">
          Vous recevrez nos meilleures stratégies directement dans votre boîte mail.
        </p>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 ${className}`}>
        <div className="text-center mb-4">
          <Mail className="w-8 h-8 text-pink-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-900">
            Recevez nos stratégies secrètes
          </h3>
          <p className="text-gray-600 text-sm">
            Guide gratuit + conseils exclusifs chaque semaine
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-center"
          />
          
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold"
          >
            {isLoading ? 'Inscription...' : 'Recevoir le Guide Gratuit'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-3">
          ✓ Pas de spam • ✓ Désabonnement en 1 clic
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6 border border-pink-200/50 ${className}`}>
      <div className="text-center mb-4">
        <Mail className="w-6 h-6 text-pink-500 mx-auto mb-2" />
        <h3 className="font-bold text-gray-900 text-lg">
          Newsletter CASHTOK
        </h3>
        <p className="text-gray-600 text-sm">
          Stratégies, astuces et actualités des réseaux sociaux
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        
        <Button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 whitespace-nowrap"
        >
          {isLoading ? '...' : 'S\'abonner'}
        </Button>
      </form>

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      <p className="text-xs text-gray-500 mt-3">
        Rejoignez 2 500+ créateurs qui reçoivent nos conseils premium
      </p>
    </div>
  );
};

export default NewsletterSignup;