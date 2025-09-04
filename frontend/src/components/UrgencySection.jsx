import React, { useState, useEffect } from 'react';
import { Clock, Users, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const UrgencySection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 32,
    seconds: 15
  });

  const [spotsLeft, setSpotsLeft] = useState(23);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    // Simulate spots decreasing
    const spotsTimer = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev > 5) {
          const decrease = Math.random() < 0.3 ? 1 : 0;
          return prev - decrease;
        }
        return prev;
      });
    }, 45000); // Every 45 seconds

    return () => {
      clearInterval(timer);
      clearInterval(spotsTimer);
    };
  }, []);

  const scrollToOffers = () => {
    const element = document.getElementById('offres');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-red-200/30 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Alert Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-100 to-orange-100 px-6 py-3 rounded-full border-2 border-red-200 mb-8 animate-pulse">
            <Zap className="w-5 h-5 text-red-500" />
            <span className="text-sm font-bold text-red-700 uppercase tracking-wide">
              ⚠️ Dernières Heures - Action Requise
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Temps Limité !
            </span>
            <br />
            <span className="text-gray-900">Ne Ratez Pas Cette</span>
            <br />
            <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              Opportunité Unique
            </span>
          </h2>

          {/* Countdown Timer */}
          <div className="mb-12">
            <div className="text-lg text-gray-600 mb-6">
              L'offre de lancement se termine dans :
            </div>
            
            <div className="flex justify-center space-x-4 md:space-x-8 mb-8">
              {/* Hours */}
              <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border-2 border-red-200 min-w-[80px] md:min-w-[120px] transform hover:scale-105 transition-transform">
                <div className="text-3xl md:text-5xl font-bold text-red-600 mb-1">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-semibold uppercase tracking-wide">
                  Heures
                </div>
              </div>

              {/* Minutes */}
              <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border-2 border-orange-200 min-w-[80px] md:min-w-[120px] transform hover:scale-105 transition-transform">
                <div className="text-3xl md:text-5xl font-bold text-orange-600 mb-1">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-semibold uppercase tracking-wide">
                  Minutes
                </div>
              </div>

              {/* Seconds */}
              <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border-2 border-pink-200 min-w-[80px] md:min-w-[120px] transform hover:scale-105 transition-transform">
                <div className="text-3xl md:text-5xl font-bold text-pink-600 mb-1">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-semibold uppercase tracking-wide">
                  Secondes
                </div>
              </div>
            </div>
          </div>

          {/* Limited Spots */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-red-200 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Users className="w-8 h-8 text-red-600" />
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Plus que <span className="text-red-600">{spotsLeft} places</span> disponibles
                </h3>
                <p className="text-gray-600 mt-2">
                  Pour l'offre Premium avec coaching personnalisé
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-red-500 to-orange-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(50 - spotsLeft) * 2}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-gray-600">
              {50 - spotsLeft} membres ont déjà rejoint le programme ce mois-ci
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              🔥 Après ça, retour aux prix normaux :
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="text-lg font-semibold text-gray-900 mb-2">Formation</div>
                <div className="text-sm text-gray-600 line-through mb-1">Prix normal : 167€</div>
                <div className="text-2xl font-bold text-red-600">Maintenant : 97€</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="text-lg font-semibold text-gray-900 mb-2">Pack Premium</div>
                <div className="text-sm text-gray-600 line-through mb-1">Prix normal : 497€</div>
                <div className="text-2xl font-bold text-red-600">Maintenant : 297€</div>
              </div>
            </div>

            <Button 
              onClick={scrollToOffers}
              className="w-full md:w-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-12 py-4 rounded-full text-xl font-bold transform hover:scale-105 transition-all shadow-2xl hover:shadow-3xl group animate-pulse"
            >
              🚀 Je Réserve Ma Place Maintenant
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="text-center text-sm text-gray-600">
              ✓ Paiement sécurisé • ✓ Accès immédiat • ✓ Garantie 30 jours
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;