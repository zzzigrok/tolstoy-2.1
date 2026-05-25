import React from 'react';
import BackgroundOrbs from './components/BackgroundOrbs';
import NeuralGrid from './components/NeuralGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Audit from './components/Audit';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-50 relative overflow-x-hidden text-white bg-[#020617]">
      <BackgroundOrbs />
      <NeuralGrid />
      <Navbar />
      <Hero />
      <Features />
      <Audit />
      <Footer />
    </div>
  );
};

export default App;
