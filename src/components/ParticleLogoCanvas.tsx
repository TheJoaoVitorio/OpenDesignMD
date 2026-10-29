import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw } from 'lucide-react';
import rawPoints from '../data/logoPoints.json';
import { useTranslation } from '../i18n/LanguageContext';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  floatPhase: number;
  floatSpeed: number;
  type: 'logo' | 'ambient';
}

interface RawPoint {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
}

interface ParticleLogoCanvasProps {
  className?: string;
  height?: number | string;
  showButton?: boolean;
  scaleFactor?: number;
}

export const ParticleLogoCanvas: React.FC<ParticleLogoCanvasProps> = ({
  className = '',
  height = '520px',
  showButton = true,
  scaleFactor = 1.05
}) => {
  const { language } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ambientParticlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const sizeRef = useRef<{ w: number; h: number; dpr: number }>({ w: 500, h: 500, dpr: 1 });
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false
  });

  const [isDispersed, setIsDispersed] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  // Track theme changes on root element
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Initialize and distribute particles based on canvas size and current theme
  const initParticles = useCallback(
    (width: number, height: number, darkTheme: boolean) => {
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Scale radius to fit the viewport comfortably
      const isDesktop = width >= 1024;
      const maxAllowedW = width * (isDesktop ? 0.78 : 0.85);
      const maxAllowedH = height * (isDesktop ? 0.78 : 0.82);
      const baseRadius = Math.min(maxAllowedW / 1.55, maxAllowedH / 1.55, 215);
      const finalRadius = baseRadius * scaleFactor;

      const logoParticles: Particle[] = (rawPoints as RawPoint[]).map((pt) => {
        const targetX = centerX + pt.x * finalRadius;
        const targetY = centerY + pt.y * finalRadius;

        let r = pt.r;
        let g = pt.g;
        let b = pt.b;
        let alpha = pt.a ?? 0.9;

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        if (!darkTheme) {
          // LIGHT MODE:
          // Near-white elements (robot head, face, document body) become sharp obsidian/slate
          if (brightness > 200) {
            r = 24;
            g = 28;
            b = 38;
            alpha = 0.92;
          } else if (brightness > 140) {
            r = 45;
            g = 55;
            b = 75;
            alpha = 0.88;
          } else if (brightness < 40) {
            // Visor / eyes / dark crevices
            r = 15;
            g = 23;
            b = 42;
            alpha = 0.95;
          }
        } else {
          // DARK MODE:
          // Near-white elements (robot head, face, document body) become crisp pure white/cool silver
          if (brightness > 190) {
            r = 245;
            g = 248;
            b = 255;
            alpha = 0.95;
          } else if (brightness < 45) {
            // Visor, eyes, palette thumb holes become distinct soft titanium slate so facial features pop
            r = 110;
            g = 125;
            b = 145;
            alpha = 0.85;
          }
        }

        const color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        const dotRadius = Math.random() * 0.9 + 1.6;

        return {
          x: targetX + (Math.random() - 0.5) * 12,
          y: targetY + (Math.random() - 0.5) * 12,
          originX: targetX,
          originY: targetY,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: dotRadius,
          color,
          alpha,
          floatPhase: Math.random() * Math.PI * 2,
          floatSpeed: 0.015 + Math.random() * 0.02,
          type: 'logo'
        };
      });

      // Ambient background particles (Google chromatic palette)
      const ambientCount = isDesktop ? 70 : 40;
      const ambientPalette = darkTheme
        ? ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8AB4F8', '#C58AF9']
        : ['#1A73E8', '#D93025', '#F9AB00', '#1E8E3E', '#1A73E8', '#9333EA'];

      const ambientParticles: Particle[] = [];
      for (let i = 0; i < ambientCount; i++) {
        const randX = Math.random() * width;
        const randY = Math.random() * height;
        const color = ambientPalette[Math.floor(Math.random() * ambientPalette.length)];

        ambientParticles.push({
          x: randX,
          y: randY,
          originX: randX,
          originY: randY,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.6 + 0.8,
          color,
          alpha: 0.3 + Math.random() * 0.4,
          floatPhase: Math.random() * Math.PI * 2,
          floatSpeed: 0.008 + Math.random() * 0.015,
          type: 'ambient'
        });
      }

      particlesRef.current = logoParticles;
      ambientParticlesRef.current = ambientParticles;
    },
    [scaleFactor]
  );

  // Canvas loop & interaction listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      let w = Math.floor(rect.width);
      let h = Math.floor(rect.height);

      // Fallback if height is not resolved yet
      if (h <= 50) {
        const parentH = container.parentElement ? container.parentElement.clientHeight : 0;
        h = parentH > 50 ? parentH : 520;
      }
      if (w <= 50) {
        const parentW = container.parentElement ? container.parentElement.clientWidth : 0;
        w = parentW > 50 ? parentW : 520;
      }

      sizeRef.current = { w, h, dpr };

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles(w, h, isDark);
    };

    // Use ResizeObserver for instant and reliable layout tracking
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Initial resize trigger
    handleResize();

    window.addEventListener('resize', handleResize);

    // Mouse & Touch listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = {
        x: -1000,
        y: -1000,
        active: false
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          active: true
        };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = {
        x: -1000,
        y: -1000,
        active: false
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Physics animation render loop
    let time = 0;
    const render = () => {
      const { w, h } = sizeRef.current;

      ctx.clearRect(0, 0, w, h);
      time += 0.02;

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const ambient = ambientParticlesRef.current;

      // 1. Render Logo Particles
      const spring = isDispersed ? 0.0035 : 0.055;
      const repelDist = 130;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic idle floating wave
        const floatX = Math.cos(time * p.floatSpeed * 50 + p.floatPhase) * 1.5;
        const floatY = Math.sin(time * p.floatSpeed * 50 + p.floatPhase) * 1.8;
        const targetX = p.originX + floatX;
        const targetY = p.originY + floatY;

        // Mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < repelDist && dist > 0) {
            const force = (1 - dist / repelDist) * 10.0;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // Spring force towards target
        p.vx += (targetX - p.x) * spring;
        p.vy += (targetY - p.y) * spring;

        // Damping / Friction
        p.vx *= 0.91;
        p.vy *= 0.91;

        p.x += p.vx;
        p.y += p.vy;

        // Render dot
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Ambient Background Particles
      for (let i = 0; i < ambient.length; i++) {
        const a = ambient[i];
        a.x += Math.cos(time * 0.5 + a.floatPhase) * 0.4;
        a.y += Math.sin(time * 0.4 + a.floatPhase) * 0.35;

        // Keep inside bounds
        if (a.x < 0) a.x = w;
        if (a.x > w) a.x = 0;
        if (a.y < 0) a.y = h;
        if (a.y > h) a.y = 0;

        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < repelDist) {
            const angle = Math.atan2(dy, dx);
            a.x += Math.cos(angle) * 2;
            a.y += Math.sin(angle) * 2;
          }
        }

        ctx.save();
        ctx.globalAlpha = a.alpha;
        ctx.fillStyle = a.color;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [initParticles, isDark, isDispersed]);

  // Disperse / Reassemble Trigger
  const handleToggleDisperse = () => {
    setIsDispersed((prev) => {
      const willDisperse = !prev;

      particlesRef.current.forEach((p) => {
        if (willDisperse) {
          // Radial explosive blast
          const angle = Math.random() * Math.PI * 2;
          const blast = 15 + Math.random() * 25;
          p.vx += Math.cos(angle) * blast;
          p.vy += Math.sin(angle) * blast;
        } else {
          // Subtle recoil when reassembling
          p.vx = (Math.random() - 0.5) * 4;
          p.vy = (Math.random() - 0.5) * 4;
        }
      });

      return willDisperse;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex flex-col items-center justify-center select-none overflow-hidden ${className}`}
      style={{
        minHeight: typeof height === 'number' ? `${height}px` : height && height !== '100%' ? height : '380px',
        height: typeof height === 'number' ? `${height}px` : height
      }}
    >
      {/* Top Floating Control Badge */}
      {showButton && (
        <div className="absolute top-3 right-4 z-20 pointer-events-auto">
          <button
            onClick={handleToggleDisperse}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#16181D]/95 backdrop-blur-md border border-[#dadce0] dark:border-[#2E333D] text-xs font-mono font-medium text-[#444746] dark:text-[#E8EAED] hover:text-[#1a73e8] dark:hover:text-[#4285F4] hover:border-[#1a73e8]/40 shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title={
              language === 'pt'
                ? 'Clique para dispersar ou reagrupar as partículas da logo'
                : 'Click to scatter or reassemble the logo particles'
            }
          >
            <RotateCw
              className={`w-3.5 h-3.5 transition-transform duration-500 ${
                isDispersed ? 'animate-spin text-[#1A73E8]' : 'text-[#5F6368] dark:text-[#9AA0A6]'
              }`}
            />
            <span>
              {isDispersed
                ? language === 'pt'
                  ? 'Reconstruir Logo'
                  : 'Reassemble Logo'
                : language === 'pt'
                ? 'Dispersar Fragmentos'
                : 'Disperse Fragments'}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full ml-0.5 animate-pulse ${
                isDispersed ? 'bg-[#34A853]' : 'bg-[#e53935]'
              }`}
            />
          </button>
        </div>
      )}

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair z-10"
        title={
          language === 'pt'
            ? 'Passe o cursor para interagir com os fragmentos da logo'
            : 'Move cursor to interact with logo shards'
        }
      />
    </div>
  );
};

export default ParticleLogoCanvas;
