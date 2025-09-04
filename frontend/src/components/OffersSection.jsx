import React from 'react';
import { Check, Star, Crown, Gift, ArrowRight, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const OffersSection = () => {
  const handlePayment = (offer, price) => {
    // Mock payment redirect - would integrate with Stripe/PayPal
    alert(`Redirection vers le paiement pour l'offre ${offer} à ${price}€`);
  };

  return (
    <section id="offres" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-blue-100 px-4 py-2 rounded-full border border-pink-200/50 mb-6">
            <Gift className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700">Offres Limitées</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choisissez Votre
            <span className="bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"> Transformation</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deux formules pour démarrer votre réussite sur les réseaux sociaux. 
            Profitez de nos prix de lancement exceptionnels !
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Offer 1 - Formation Seule */}
          <Card className="relative bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 hover:border-pink-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                Populaire
              </div>
            </div>
            
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-red-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-pink-600" />
              </div>
              
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Formation CASHTOK
              </CardTitle>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">97€</span>
                  <div className="text-right">
                    <div className="text-lg text-gray-500 line-through">167€</div>
                    <div className="text-sm text-green-600 font-semibold">-42% de réduction</div>
                  </div>
                </div>
                <p className="text-gray-600">Paiement unique</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Formation complète en 12 modules progressifs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Stratégies secrètes TikTok, Instagram & YouTube</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Templates et outils prêts à utiliser</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Méthodes de monétisation éprouvées</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Accès à vie aux contenus</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Mises à jour gratuites</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    Valeur réelle : 500€+
                  </div>
                  <div className="text-sm text-gray-600">
                    Formation + Templates + Stratégies
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handlePayment('Formation', 97)}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all shadow-lg hover:shadow-xl group"
              >
                Je m'inscris à 97€
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="text-center">
                <div className="text-sm text-gray-500">
                  ✓ Garantie satisfait ou remboursé 30 jours
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Offer 2 - Formation + Coaching + Communauté */}
          <Card className="relative bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-300 hover:border-purple-400">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1">
                <Crown className="w-4 h-4" />
                <span>Premium</span>
              </div>
            </div>
            
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Crown className="w-8 h-8 text-blue-600" />
              </div>
              
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Pack Premium Complet
              </CardTitle>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">297€</span>
                  <div className="text-right">
                    <div className="text-lg text-gray-500 line-through">497€</div>
                    <div className="text-sm text-green-600 font-semibold">-40% de réduction</div>
                  </div>
                </div>
                <p className="text-gray-600">Accompagnement complet</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-white/50 rounded-xl p-4 border border-blue-200">
                <div className="text-center text-blue-700 font-semibold mb-2">
                  <Zap className="w-5 h-5 inline mr-1" />
                  Tout de l'offre Formation +
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-semibold">Coaching personnalisé 1-on-1</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-semibold">Communauté exclusive VIP</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sessions de groupe mensuelles</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Support prioritaire 24/7</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Audit personnel de vos comptes</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Networking avec des créateurs à succès</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    Valeur réelle : 1 200€+
                  </div>
                  <div className="text-sm text-gray-600">
                    Formation + Coaching + Communauté + Support
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handlePayment('Premium', 297)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all shadow-lg hover:shadow-xl group"
              >
                Je veux l'offre complète à 297€
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="text-center">
                <div className="text-sm text-gray-500">
                  ✓ Garantie satisfait ou remboursé 30 jours<br/>
                  ✓ Places limitées - Seulement 50 membres/mois
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            <span className="font-semibold text-red-600">⏰ Offre limitée :</span> Prix de lancement valables jusqu'à épuisement des places
          </p>
          <div className="text-sm text-gray-500">
            Paiement 100% sécurisé • Remboursement garanti • Support français
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;