import React from 'react';
import { Zap, Mail, MessageCircle, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                  CASHTOK
                </h3>
                <p className="text-xs text-gray-400">System</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              La formation #1 en France pour monétiser TikTok, Instagram et YouTube. 
              Transformez votre passion en revenus réguliers.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <a href="#accueil" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#offres" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Nos Offres
                </a>
              </li>
              <li>
                <a href="#temoignages" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Témoignages
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-pink-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Formation */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Formation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Monétisation TikTok
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Stratégies Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                  YouTube Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Coaching Personnalisé
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Communauté VIP
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact & Support</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pink-500" />
                <a href="mailto:support@cashtok.com" className="text-gray-400 hover:text-pink-400 transition-colors">
                  support@cashtok.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <span className="text-gray-400">
                  Chat en direct 24/7
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-500" />
                <span className="text-gray-400">
                  +33 1 23 45 67 89
                </span>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1" />
                <div className="text-gray-400">
                  <div>Paris, France</div>
                  <div className="text-sm">Support en français</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 CASHTOK System. Tous droits réservés.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Mentions Légales
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Politique de Confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                CGV
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Remboursement
              </a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              Ce site ne fait pas partie du site web Facebook ou Facebook Inc. En outre, ce site n'est PAS approuvé par Facebook en aucune façon. 
              FACEBOOK est une marque déposée de FACEBOOK Inc. Les témoignages présentés sont des exemples de réussite et ne garantissent pas des résultats similaires.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;