import React, { useEffect } from 'react';
import Hero from '../components/layout/Hero';
import { Routes, Route, Navigate } from 'react-router-dom';
import FeaturesPage from './FeaturesPage';
import TeamPage from './TeamPage';
import LoginPage from './loginPage';
import SignupPage from './signupPage';
import Navigation from '../components/navigation/Navigation';
import ChatPage from './app/ChatPage';

function HomePage() {
  let titleArray = [
    "Revolutionizing Agriculture with AI-Driven Recommendations",
    "Empowering Farmers with Data-Driven Insights",
    "Transforming Agriculture with AI-Driven Recommendations",
  ];
  let subtitleArray = [
    "Leverage the power of AI to optimize crop yield, reduce waste, and make informed farming decisions.",
    "Personalized agricultural insights that help you grow smarter, not harder.",
    "Get expert farming advice, tailored to your unique needs and conditions, all powered by AI.",
  ];
  
  useEffect(() => {
    document.title = "Deeproots - " + titleArray[Math.floor(Math.random() * subtitleArray.length)];
  }, []);
  return (
    <>
      <Navigation 
      links={[
        { text: "Home", href: "/" },
        { text: "Features", href: "/features" },
        { text: "Team", href: "/team" },
      ]}
      authLinks={[
        { text: "Login", href: "/login" },
        { text: "Sign Up", href: "/signup", type: "primary" },
      ]}
      />
      <Hero
        title={titleArray[Math.floor(Math.random() * titleArray.length)]}
        subtitle={subtitleArray[Math.floor(Math.random() * subtitleArray.length)]}
        ctaPrimary={{ text: "Get Started", href: "/get-started" }}
      />
    </>
  );
}

export default function Index() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/app" element={<ChatPage />} /> {/* App Landing Page */}
      </Routes>
    </>
  );
}