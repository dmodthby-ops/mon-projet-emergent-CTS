import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import OffersSection from "./components/OffersSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import UrgencySection from "./components/UrgencySection";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import NewsletterSignup from "./components/NewsletterSignup";
import AnalyticsProvider from "./components/AnalyticsTracker";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      
      {/* Newsletter Signup between Hero and Offers */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup 
              source="hero_bottom" 
              variant="hero"
              className="mx-auto"
            />
          </div>
        </div>
      </section>
      
      <OffersSection />
      <TestimonialsSection />
      <FAQSection />
      <UrgencySection />
      
      {/* Newsletter Signup before Footer */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <NewsletterSignup 
              source="pre_footer" 
              variant="default"
            />
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Chat Widget - Always visible */}
      <ChatWidget />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <AnalyticsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AnalyticsProvider>
    </div>
  );
}

export default App;