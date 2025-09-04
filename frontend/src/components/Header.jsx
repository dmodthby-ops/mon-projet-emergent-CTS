import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-600 rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                CASHTOK
              </h1>
              <p className="text-xs text-gray-600">System</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('accueil')}
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('offres')}
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              Offres
            </button>
            <button 
              onClick={() => scrollToSection('temoignages')}
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              Témoignages
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              FAQ
            </button>
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex">
            <Button 
              onClick={() => scrollToSection('offres')}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Commencer Maintenant
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200/50">
            <nav className="flex flex-col space-y-4 p-6">
              <button 
                onClick={() => scrollToSection('accueil')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-left"
              >
                Accueil
              </button>
              <button 
                onClick={() => scrollToSection('offres')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-left"
              >
                Offres
              </button>
              <button 
                onClick={() => scrollToSection('temoignages')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-left"
              >
                Témoignages
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-left"
              >
                FAQ
              </button>
              <Button 
                onClick={() => scrollToSection('offres')}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 rounded-full font-semibold"
              >
                Commencer Maintenant
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;