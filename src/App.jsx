import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TheHook from './components/TheHook';
import JourneyTimeline from './components/JourneyTimeline';
import ManualVsAutomated from './components/ManualVsAutomated';
import TechnologyStack from './components/TechnologyStack';
import SpeakerSection from './components/SpeakerSection';
import ArrivalInstructions from './components/ArrivalInstructions';
import FinalCTA from './components/FinalCTA';
import AwsSbgFooter from './components/AwsSbgFooter';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('sbg_workshop_theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sbg_workshop_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="workshop-microsite-root">
      <Navbar currentTheme={theme} toggleTheme={toggleTheme} />
      <main id="main-content">
        <Hero />
        <TheHook />
        <JourneyTimeline />
        <ManualVsAutomated />
        <TechnologyStack />
        <SpeakerSection />
        <ArrivalInstructions />
        <FinalCTA />
      </main>
      <AwsSbgFooter />
    </div>
  );
}
