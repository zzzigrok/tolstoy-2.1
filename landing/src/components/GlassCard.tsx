import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", delay = "0s" }) => (
  <div
    className={`bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500 rounded-3xl ${className} fade-up`}
    style={{ animationDelay: delay }}
  >
    {children}
  </div>
);

export default GlassCard;
