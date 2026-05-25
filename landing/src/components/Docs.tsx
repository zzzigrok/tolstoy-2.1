import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ArrowLeft, Search, ChevronRight, ChevronDown, Menu, X, Clock } from 'lucide-react';
import mermaid from 'mermaid';
import { docsData } from '../docsData';
import type { DocItem } from '../docsData';
import 'katex/dist/katex.min.css';

interface DocsProps {
  setCurrentPage: (page: 'home' | 'docs') => void;
}

export const Docs: React.FC<DocsProps> = ({ setCurrentPage }) => {
  // Store the selected document state, default to category "intro", item "quick-start"
  const defaultItem = useMemo(() => {
    const introCat = docsData.find(c => c.slug === 'intro');
    return introCat?.items.find(i => i.id === 'quick-start') || docsData[0]?.items[0];
  }, []);

  const [activeItem, setActiveItem] = useState<DocItem>(defaultItem);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track expanded categories - default expanding activeItem's category
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const initialCategory = docsData.find(c => c.items.some(i => i.id === 'quick-start'))?.slug || '';
    return { [initialCategory]: true };
  });

  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut handler (pressing '/' focuses the search input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Callback ref to render Mermaid diagrams reliably when the container mounts
  const docsContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const containerNode = node;
    
    async function renderMermaid() {
      const elements = containerNode.querySelectorAll('pre code.language-mermaid');
      if (elements.length === 0) return;
      
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose'
        });
        
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i] as HTMLElement;
          const parent = el.parentElement;
          if (!parent) continue;
          
          const chartText = el.textContent || '';
          if (!chartText.trim()) continue;
          
          const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
          const { svg } = await mermaid.render(id, chartText);
          
          const container = document.createElement('div');
          container.className = 'mermaid-container my-6 flex justify-center bg-slate-950/20 border border-slate-800/50 p-6 rounded-xl overflow-x-auto';
          container.innerHTML = svg;
          parent.replaceWith(container);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
      }
    }

    // Run next frame to ensure browser has processed the innerHTML
    setTimeout(renderMermaid, 0);
  }, [activeItem.id]);


  // Intersection Observer for headings
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find(entry => entry.isIntersecting);
      if (visibleEntry) {
        setActiveHeadingId(visibleEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const headingsElements = document.querySelectorAll('.prose-docs h2[id], .prose-docs h3[id]');
    headingsElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [activeItem.id]);

  // Return the compiled HTML directly since Mermaid will be dynamically swapped in the useEffect hook
  const preparedHtml = useMemo(() => {
    return activeItem.html;
  }, [activeItem.html]);

  // Flattened items for search
  const allDocItems = useMemo(() => {
    return docsData.flatMap(cat =>
      cat.items.map(item => ({
        ...item,
        categoryTitle: cat.title,
        categorySlug: cat.slug
      }))
    );
  }, []);

  // Filter search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allDocItems.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.html.toLowerCase().includes(query)
    );
  }, [searchQuery, allDocItems]);

  const activeCategory = useMemo(() => {
    return docsData.find(c => c.items.some(i => i.id === activeItem.id));
  }, [activeItem.id]);

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  const selectItem = (item: DocItem, categorySlug: string) => {
    setActiveItem(item);
    setExpandedCategories(prev => ({
      ...prev,
      [categorySlug]: true
    }));
    setIsSearchOpen(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeadingClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -40; // Small offset for top padding
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveHeadingId(id);
    }
  };

  // Reusable Sidebar JSX
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full pt-4">
      {/* Back Button */}
      <button
        onClick={() => setCurrentPage('home')}
        className="flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors group text-left self-start"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Вернуться на главную</span>
      </button>

      {/* Search Input */}
      <div ref={searchContainerRef} className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full pl-10 pr-10 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all backdrop-blur-md"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-800/60 border border-slate-700 rounded-md text-[10px] text-slate-400 font-mono select-none">
            <span>/</span>
          </div>
        </div>

        {/* Search Results Dropdown */}
        {isSearchOpen && searchQuery.trim() !== '' && (
          <div className="absolute z-50 left-0 right-0 mt-2 max-h-80 overflow-y-auto bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl p-2 scrollbar-thin">
            {searchResults.length > 0 ? (
              searchResults.map(item => (
                <button
                  key={item.id}
                  onClick={() => selectItem(item, item.categorySlug)}
                  className="w-full text-left p-3 hover:bg-slate-900/80 rounded-lg transition-colors group flex flex-col gap-1 border border-transparent hover:border-cyan-500/20"
                >
                  <span className="text-xs font-semibold text-cyan-400/80 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                    {item.categoryTitle}
                  </span>
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                </button>
              ))
            ) : (
              <div className="text-center py-6 text-sm text-slate-400">
                Ничего не найдено
              </div>
            )}
          </div>
        )}
      </div>

      {/* Categories Accordion Menu */}
      <nav className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
        {docsData.map(category => {
          const isExpanded = !!expandedCategories[category.slug];
          return (
            <div key={category.slug} className="mb-2">
              <button
                onClick={() => toggleCategory(category.slug)}
                className="w-full flex items-center justify-between py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-900/30"
              >
                <span>{category.title}</span>
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              {isExpanded && (
                <div className="mt-1 ml-3 pl-3 border-l border-slate-800 space-y-1">
                  {category.items.map(item => {
                    const isActive = item.id === activeItem.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => selectItem(item, category.slug)}
                        className={`w-full text-left py-1.5 px-3 text-sm rounded-lg transition-all block ${
                          isActive
                            ? 'text-cyan-400 font-bold bg-cyan-950/20 border-l-2 border-cyan-400 -ml-[13px] pl-[11px]'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                        }`}
                      >
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen text-slate-100 flex flex-col relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8 items-start w-full relative">
        {/* Left Sidebar (Desktop) */}
        <aside className="w-72 shrink-0 h-[calc(100vh-5rem)] sticky top-10 overflow-y-auto hidden lg:block border-r border-slate-800/40 pr-6">
          {renderSidebarContent()}
        </aside>

        {/* Mobile menu toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full shadow-lg text-white hover:scale-105 transition-transform"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex">
            <div className="w-80 max-w-[85vw] h-full bg-[#020617] border-r border-slate-900 p-6 overflow-y-auto flex flex-col">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="self-end p-2 text-slate-400 hover:text-white mb-4"
              >
                <X className="w-6 h-6" />
              </button>
              {renderSidebarContent()}
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Middle Content Area */}
        <main className="flex-1 min-w-0 max-w-4xl py-4">
          {/* Breadcrumbs Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/60 mb-8">
            <div className="text-[10px] tracking-[0.2em] font-bold text-slate-400/80 flex items-center gap-1.5">
              <span>TOLSTOY AI</span>
              <span className="text-slate-600">/</span>
              <span>{activeCategory?.title.toUpperCase()}</span>
              <span className="text-slate-600">/</span>
              <span className="text-cyan-400">{activeItem.title.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-950/20 border border-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.05)]">
              <Clock className="w-3.5 h-3.5" />
              <span>Время чтения: {activeItem.readingTime} мин</span>
            </div>
          </div>

          {/* Main Text Pane */}
          <article className="min-h-[500px]">
            <div
              key={activeItem.id}
              ref={docsContainerRef}
              className="prose-docs"
              dangerouslySetInnerHTML={{ __html: preparedHtml }}
            />
          </article>
        </main>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="w-60 shrink-0 h-[calc(100vh-5rem)] sticky top-10 overflow-y-auto hidden xl:block border-l border-slate-800/40 pl-6">
          <div className="space-y-4 pt-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Содержание
            </div>
            <nav className="space-y-2 border-l border-slate-800/60 pl-px">
              {activeItem.headings && activeItem.headings.length > 0 ? (
                activeItem.headings.map(heading => {
                  const isActive = activeHeadingId === heading.id;
                  const indentClass = heading.level === 3 ? 'pl-4' : 'pl-3';
                  return (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      onClick={(e) => handleHeadingClick(e, heading.id)}
                      className={`block text-xs leading-relaxed transition-all relative py-0.5 border-l -ml-px ${
                        isActive
                          ? 'text-cyan-400 font-bold border-cyan-400'
                          : 'text-slate-400 hover:text-slate-200 border-transparent'
                      } ${indentClass}`}
                    >
                      {heading.text}
                    </a>
                  );
                })
              ) : (
                <div className="text-xs text-slate-500 pl-3">Нет разделов</div>
              )}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};
