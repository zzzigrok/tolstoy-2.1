import React, { useEffect } from 'react';
import BackgroundOrbs from './components/BackgroundOrbs';
import NeuralGrid from './components/NeuralGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Audit from './components/Audit';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    class AIScannerEffect {
      targets: NodeListOf<Element> | Element[] = [];
      beam: HTMLElement | null = null;
      active = true;

      constructor() {
        this.init();
      }

      init() {
        let wrapper = document.getElementById('ai-scanner-wrapper');
        if (!wrapper) {
          wrapper = document.createElement('div');
          wrapper.id = 'ai-scanner-wrapper';
          wrapper.innerHTML = '<div class="ai-scanner-beam" id="ai-scanner-beam"></div>';
          document.body.appendChild(wrapper);
        }

        this.beam = document.getElementById('ai-scanner-beam');
        this.targets = document.querySelectorAll('.scan-target');
        this.monitorIntersections();
      }

      monitorIntersections() {
        const checkPos = () => {
          if (!this.active) return;
          if (!this.beam) return;
          const beamRect = this.beam.getBoundingClientRect();
          const scanLineY = beamRect.bottom;

          this.targets.forEach(target => {
            const rect = target.getBoundingClientRect();
            if (scanLineY >= rect.top && scanLineY <= (rect.bottom + 30)) {
              target.classList.add('scan-distortion');
            } else {
              target.classList.remove('scan-distortion');
            }
          });
          requestAnimationFrame(checkPos);
        };
        requestAnimationFrame(checkPos);
      }

      destroy() {
        this.active = false;
        const wrapper = document.getElementById('ai-scanner-wrapper');
        if (wrapper && wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
      }
    }

    const scanner = new AIScannerEffect();
    return () => {
      scanner.destroy();
    };
  }, []);

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
