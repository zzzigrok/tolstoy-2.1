import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with custom theme configurations matching the premium dark theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  themeVariables: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    background: 'transparent',
    
    // Node colors
    primaryColor: '#1e293b', // slate-800
    primaryTextColor: '#f8fafc', // slate-50
    primaryBorderColor: 'rgba(255, 255, 255, 0.15)',
    
    // Line colors
    lineColor: '#60a5fa', // blue-400
    arrowheadColor: '#60a5fa',
    
    // Label backgrounds
    edgeLabelBackground: '#0f172a', // slate-900
    
    // Secondary/Tertiary (for alternative node styles)
    secondaryColor: '#0f172a',
    secondaryTextColor: '#cbd5e1',
    secondaryBorderColor: 'rgba(255, 255, 255, 0.1)',
    
    tertiaryColor: '#1e1b4b', // indigo-950
    tertiaryTextColor: '#e0e7ff', // indigo-100
    tertiaryBorderColor: 'rgba(129, 140, 248, 0.3)',
    
    // Note colors
    noteBkgColor: '#1e293b',
    noteTextColor: '#f8fafc',
    noteBorderColor: 'rgba(255, 255, 255, 0.15)',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    nodeSpacing: 50,
    rankSpacing: 50,
  },
});

interface MermaidProps {
  chart: string;
}

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const elementIdRef = useRef<string>('');

  useEffect(() => {
    let isMounted = true;
    const cleanChart = chart.trim();

    const renderChart = async () => {
      try {
        setError(null);
        
        // Generate a new ID each time to avoid cache or collision issues
        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        elementIdRef.current = uniqueId;

        // Render diagram
        const { svg: renderedSvg } = await mermaid.render(uniqueId, cleanChart);
        
        if (isMounted) {
          // Wrap the SVG in a responsive wrapper and remove inline style overrides that restrict sizing
          let processedSvg = renderedSvg;
          
          // Sometimes mermaid puts styling like max-width on the svg. Let's make it fully responsive
          processedSvg = processedSvg.replace(/max-width:\s*\d+px;/g, 'max-width: 100%;');
          
          setSvg(processedSvg);
        }
      } catch (err: unknown) {
        console.error('Mermaid rendering error:', err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        
        // Catch dynamic module loading failures (due to new build deploying and changing chunk hashes)
        const isDynamicImportError = 
          /failed\s+to\s+fetch\s+dynamically\s+imported\s+module/i.test(errorMessage) ||
          /importing\s+a\s+module\s+script\s+failed/i.test(errorMessage) ||
          /error\s+loading\s+dynamically\s+imported\s+module/i.test(errorMessage);
        
        if (isDynamicImportError) {
          console.warn('Dynamic import error detected in Mermaid renderer. Reloading page...');
          window.location.reload();
          return;
        }

        if (isMounted) {
          setError(errorMessage || 'Ошибка парсинга или рендеринга схемы');
        }
        
        // Clean up mermaid inner state if rendering fails, to prevent blocking subsequent renders
        const badElement = document.getElementById(elementIdRef.current);
        if (badElement) {
          badElement.remove();
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="p-5 my-6 rounded-2xl border border-rose-500/20 bg-rose-950/20 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2 mb-3 text-rose-400 font-semibold text-sm">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Не удалось отобразить схему</span>
        </div>
        <pre className="text-xs text-rose-300 font-mono overflow-x-auto bg-slate-950/40 p-3 rounded-lg border border-rose-950/40 max-h-48 mb-3">
          {error}
        </pre>
        <details className="text-xs text-slate-400 cursor-pointer">
          <summary className="hover:text-slate-300 select-none">Показать исходный код схемы</summary>
          <pre className="mt-2 text-xs text-slate-500 overflow-x-auto bg-slate-950/30 p-3 rounded-lg border border-white/5 whitespace-pre">
            {chart}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center w-full">
      <div 
        className="mermaid-container w-full max-w-full overflow-x-auto p-6 md:p-8 rounded-2xl border border-white/10 bg-slate-900/30 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_45px_rgba(59,130,246,0.1)] flex justify-center items-center"
        dangerouslySetInnerHTML={{ 
          __html: svg || '<div class="text-slate-400 text-sm font-semibold flex items-center gap-2 py-4"><span class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>Построение схемы...</div>' 
        }}
      />
    </div>
  );
};
