import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../mock';

const TestimonialsSection = () => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  useEffect(() => {
    const scrollContainer1 = scrollRef1.current;
    const scrollContainer2 = scrollRef2.current;
    
    if (!scrollContainer1 || !scrollContainer2) return;

    const scroll1 = () => {
      if (scrollContainer1.scrollLeft >= scrollContainer1.scrollWidth / 2) {
        scrollContainer1.scrollLeft = 0;
      } else {
        scrollContainer1.scrollLeft += 1;
      }
    };

    const scroll2 = () => {
      if (scrollContainer2.scrollLeft <= 0) {
        scrollContainer2.scrollLeft = scrollContainer2.scrollWidth / 2;
      } else {
        scrollContainer2.scrollLeft -= 1;
      }
    };

    const interval1 = setInterval(scroll1, 30);
    const interval2 = setInterval(scroll2, 30);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const TestimonialCard = ({ testimonial }) => (
    <div className="flex-shrink-0 w-72 md:w-80 bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow mx-2 md:mx-4 border border-gray-100">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <div className="flex items-center space-x-1">
            {renderStars(testimonial.rating)}
          </div>
        </div>
      </div>
      
      <div className="relative">
        <Quote className="w-6 h-6 text-pink-500 mb-2 opacity-50" />
        <p className="text-gray-700 leading-relaxed mb-4">
          {testimonial.text}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-600">{testimonial.platform}</div>
        <div className="text-sm font-semibold text-green-600">{testimonial.revenue}</div>
      </div>
    </div>
  );

  // Duplicate testimonials for infinite scroll effect - 15 per row
  const duplicatedTestimonials1 = [...testimonials.slice(0, 15), ...testimonials.slice(0, 15)];
  const duplicatedTestimonials2 = [...testimonials.slice(15, 30), ...testimonials.slice(15, 30)];

  return (
    <section id="temoignages" className="py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full border border-green-200/50 mb-6">
            <Star className="w-4 h-4 text-green-500 fill-current" />
            <span className="text-sm font-medium text-gray-700">Témoignages Vérifiés</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ils ont Transformé leur
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Vie Financière</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment nos membres génèrent des milliers d'euros grâce aux stratégies CASHTOK
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">2 500+</div>
            <div className="text-gray-600">Membres actifs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">95%</div>
            <div className="text-gray-600">Taux de satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">3 200€</div>
            <div className="text-gray-600">Revenu moyen/mois</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">30j</div>
            <div className="text-gray-600">Premiers résultats</div>
          </div>
        </div>

        {/* Scrolling Testimonials */}
        <div className="space-y-8">
          {/* First Row - Left to Right */}
          <div className="relative">
            <div
              ref={scrollRef1}
              className="flex overflow-hidden scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
            >
              {duplicatedTestimonials1.map((testimonial, index) => (
                <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="relative">
            <div
              ref={scrollRef2}
              className="flex overflow-hidden scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
            >
              {duplicatedTestimonials2.map((testimonial, index) => (
                <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Elements */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-6 bg-white rounded-2xl px-8 py-4 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">Communauté active 24/7</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-700">4.9/5 étoiles</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm text-gray-700">Suivi personnalisé</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;