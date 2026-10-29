import React, { useState, useEffect } from 'react';

interface FragmentedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showArtwork?: boolean;
  className?: string;
  interactive?: boolean;
}

export const FragmentedLogo: React.FC<FragmentedLogoProps> = ({
  size = 'md',
  showArtwork = false,
  className = '',
  interactive = true
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    hero: 'w-32 h-32 sm:w-40 sm:h-40'
  }[size];

  if (showArtwork) {
    return (
      <div className={`relative group flex items-center justify-center ${className}`}>
        {/* Ambient Chromatic Gravity Glow */}
        <div className="absolute inset-0 -m-6 bg-radial from-[#1A73E8]/20 via-[#34A853]/10 to-transparent blur-2xl rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700" />

        {/* Floating Fragment Shards in 3D Space */}
        <div
          className={`relative ${sizeClasses} rounded-3xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-[#1A73E8]/40 transition-all duration-500`}
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          <img
            src="/logo-fragmented.png"
            alt="OpenDesignMD Antigravity Shard Logo"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Shimmer light pass */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </div>

        {/* Orbiting Satellite Shards */}
        <span
          className="absolute -top-2 -right-2 w-3.5 h-3.5 rounded-lg bg-gradient-to-br from-[#1A73E8] to-[#4285F4] shadow-md border border-white/40 transform transition-transform duration-300"
          style={{ transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px) rotate(45deg)` }}
        />
        <span
          className="absolute -bottom-2 -left-2 w-2.5 h-2.5 rounded-full bg-[#34A853] shadow-md ring-2 ring-white/20 transform transition-transform duration-300"
          style={{ transform: `translate(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)` }}
        />
        <span
          className="absolute top-1/2 -right-4 w-2 h-2 rounded-sm bg-[#FBBC05] shadow-xs transform transition-transform duration-300"
          style={{ transform: `translate(${mousePos.y * 0.4}px, ${-mousePos.x * 0.4}px) rotate(20deg)` }}
        />
      </div>
    );
  }

  // Transparent logo with floating Antigravity fragments
  return (
    <div className={`relative group inline-flex items-center justify-center ${className}`}>
      {/* Subtle Glow */}
      <div className="absolute inset-0 -m-3 bg-[#1A73E8]/15 blur-xl rounded-full pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />

      {/* Main Transparent Logo Image */}
      <div
        className={`relative ${sizeClasses} flex items-center justify-center`}
        style={{
          transform: `perspective(600px) rotateY(${mousePos.x * 0.25}deg) rotateX(${-mousePos.y * 0.25}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <img
          src="/logo.png"
          alt="OpenDesignMD"
          className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to opendesignlogo if logo.png ever fails
            (e.currentTarget as HTMLImageElement).src = '/opendesignlogo.png';
          }}
        />

        {/* Orbiting Antigravity Fragment Points */}
        <span
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#1A73E8] ring-2 ring-white dark:ring-[#121317] shadow-sm transform transition-transform duration-200"
          style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
        />
        <span
          className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-sm bg-[#34A853] transform transition-transform duration-200"
          style={{ transform: `translate(${-mousePos.x * 0.25}px, ${-mousePos.y * 0.25}px) rotate(45deg)` }}
        />
      </div>
    </div>
  );
};
