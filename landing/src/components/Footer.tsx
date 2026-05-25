import React from 'react';
import { BookOpen } from 'lucide-react';
import GithubIcon from './GithubIcon';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/50 backdrop-blur-lg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-slate-400" />
          <span className="font-bold text-slate-300 tracking-wider">TOLSTOY AI</span>
        </div>
        <p className="text-slate-500 text-sm font-medium">
          © 2026 Tolstoy AI Project. MIT License.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/zzzigrok/tolstoy-2.1"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all border border-white/10"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
