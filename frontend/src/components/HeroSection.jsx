import React, { useState, useEffect } from 'react';
import { Play, Star, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { heroImages } from '../mock';

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const stats = [
    { number: "5 000€", label: "revenus mensuels possibles" },
    { number: "30 jours", label: "pour voir les premiers résultats" },
    { number: "95%", label: "de taux de satisfaction" },
    { number: "2 500+", label: "membres actifs" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToOffers = () => {
    const element = document.getElementById('offres');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-red-200/20 to-transparent rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-blue-100 px-4 py-2 rounded-full border border-pink-200/50">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">Formation #1 en France</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-pink-600 via-red-500 to-blue-600 bg-clip-text text-transparent">
                  Transformez
                </span>
                <br />
                <span className="text-gray-900">TikTok, Instagram</span>
                <br />
                <span className="text-gray-900">& YouTube en</span>
                <br />
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Sources de Revenus
                </span>
              </h1>
              
              {/* Platform Logos */}
              <div className="flex items-center space-x-6 py-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">TT</span>
                  </div>
                  <span className="text-sm text-gray-600">TikTok</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">IG</span>
                  </div>
                  <span className="text-sm text-gray-600">Instagram</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                  <span className="text-sm text-gray-600">YouTube</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Découvrez les méthodes secrètes pour monétiser vos réseaux sociaux et générer jusqu'à 
              <span className="font-bold text-green-600"> 5 000€/mois</span> grâce au système CASHTOK.
            </p>

            {/* Animated Stats */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {stats[currentStat].number}
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  {stats[currentStat].label}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={scrollToOffers}
                className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all shadow-lg hover:shadow-xl group"
              >
                Commencer Mon Transformation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>2 500+ membres</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Résultats garantis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="relative max-w-lg mx-auto">
              {/* Main Hero Image */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <img 
                  src={heroImages.main}
                  alt="CASHTOK System - Monétisation réseaux sociaux"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-blue-500/20 rounded-3xl"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-lg animate-bounce delay-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">+3 200€</span>
                </div>
                <p className="text-xs text-gray-500">ce mois</p>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg animate-bounce delay-1000">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-gray-700">+247%</span>
                </div>
                <p className="text-xs text-gray-500">croissance</p>
              </div>

              {/* Background decorative elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-pink-200/30 to-blue-200/30 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;