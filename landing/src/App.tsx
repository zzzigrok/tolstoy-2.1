import React, { useState } from 'react';
import BackgroundOrbs from './components/BackgroundOrbs';
import NeuralGrid from './components/NeuralGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Audit from './components/Audit';
import Footer from './components/Footer';
import { Docs } from './components/Docs';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'docs'>('home');

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-50 relative overflow-x-hidden text-white bg-[#020617]">
      {currentPage === 'docs' ? (
        <>
          <BackgroundOrbs />
          <NeuralGrid />
          <Docs setCurrentPage={setCurrentPage} />
        </>
      ) : (
        <>
          <BackgroundOrbs />
          <NeuralGrid />
          <Navbar setCurrentPage={setCurrentPage} />
          <Hero />
          <Features />
          <Audit />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
