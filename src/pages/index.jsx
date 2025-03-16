import React from 'react';
import Navigation from '../components/navigation';
import Hero from '../components/hero';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import FeaturesPage from './FeaturesPage';
import TeamPage from './TeamPage';
import LoginPage from './loginPage';
import SignupPage from './signupPage';	
import { Navigate } from 'react-router-dom';




export default function Index(){
  let titleArray = ["Revolutionizing Agriculture with AI-Driven Recommendations", "Empowering Farmers with Data-Driven Insights", "Transforming Agriculture with AI-Driven Recommendations", "Revolutionizing Agriculture with AI-Driven Recommendations", "Empowering Farmers with Data-Driven Insights", "Transforming Agriculture with AI-Driven Recommendations"];
  let subtitleArray = ["Leverage the power of AI to optimize crop yield, reduce waste, and make informed farming decisions.","Personalized agricultural insights that help you grow smarter, not harder.","Get expert farming advice, tailored to your unique needs and conditions, all powered by AI.","Deeproots delivers real-time, data-driven recommendations for sustainable and profitable farming.","Harness cutting-edge AI to navigate challenges and maximize the potential of your crops."];
  return(
    <>
      <BrowserRouter>
      <Navigation 
        links={[
          {text: "Home", href: "/home"},
          {text: "Features", href: "/features"},
          {text: "Team", href: "/team"},
        ]}
        authLinks={[
          { text: "Log In", href: "/login", type: "secondary" },
          { text: "Sign Up", href: "/signup", type: "primary" },
        ]}
      />
      
      <Routes>
        <Route path="/home" element={<Index />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* You might want to add a redirect for the root path */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
      <Hero 
        title={titleArray[Math.floor(Math.random() * titleArray.length)]}
        subtitle={subtitleArray[Math.floor(Math.random() * subtitleArray.length)]}
        ctaPrimary={{text: "Get Started", href: "/get-started"}}
      />


    </>
  );
}