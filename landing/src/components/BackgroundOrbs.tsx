import React from 'react';

const BackgroundOrbs: React.FC = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020617]">
    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen orb-1" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen orb-2" />
    <div className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
  </div>
);

export default BackgroundOrbs;
