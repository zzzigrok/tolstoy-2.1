import React, { useState, useEffect, lazy, Suspense } from 'react';
import BackgroundOrbs from './components/BackgroundOrbs';
import NeuralGrid from './components/NeuralGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Audit from './components/Audit';
import Footer from './components/Footer';
import './App.css';

// Lazy load Docs to keep initial landing bundle fast and lightweight
const Docs = lazy(() => import('./components/Docs').then((m) => ({ default: m.Docs })));

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'docs'>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#/docs')) {
      return 'docs';
    }
    return 'home';
  });

  // Sync hash routing with page state
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#/docs')) {
        setCurrentPage('docs');
      } else if (
        window.location.hash === '' ||
        window.location.hash.startsWith('#architecture') ||
        window.location.hash.startsWith('#audit')
      ) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'docs') => {
    setCurrentPage(page);
    if (page === 'docs') {
      window.location.hash = '#/docs';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-50 relative overflow-x-hidden text-white bg-[#020617]">
      <BackgroundOrbs />
      <NeuralGrid />

      {currentPage === 'docs' ? (
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center text-cyan-400">
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900/60 border border-cyan-500/30 backdrop-blur-xl">
                <span className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span className="font-mono text-sm tracking-wide">Загрузка Tolstoy Docs...</span>
              </div>
            </div>
          }
        >
          <Docs setCurrentPage={handleNavigate} />
        </Suspense>
      ) : (
        <>
          <Navbar setCurrentPage={handleNavigate} />
          <Hero />
          <Features />
          <Audit />
          <Footer setCurrentPage={handleNavigate} />
        </>
      )}
    </div>
  );
};

export default App;
