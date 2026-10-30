import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sun,
  Moon,
  Sparkles,
  Layers,
  ArrowRight,
  User as UserIcon,
  LogOut,
  Terminal,
  Compass,
  Cpu,
  Languages
} from 'lucide-react';
import { User } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user: User | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  user,
  onLogout
}) => {
  const location = useLocation();
  const { language, toggleLanguage, t } = useTranslation();

  const isCurrent = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF9F6]/90 dark:bg-[#0D0E12]/90 border-b border-[#E8EAED] dark:border-[#1E2128] transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img
              src="/logo.png"
              alt="OpenDesignMD"
              className="w-full h-full object-contain filter drop-shadow-sm"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/logo-fragmented.png';
              }}
            />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#1A73E8] ring-2 ring-white dark:ring-[#121317]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-sans font-medium text-lg tracking-tight text-[#121317] dark:text-white">
                OpenDesignMD
              </span>          
            </div>      
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <Link
            to="/explore"
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isCurrent('/explore') || isCurrent('/system')
                ? 'bg-[#121317] text-white dark:bg-white dark:text-[#121317] shadow-xs'
                : 'text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <Compass className="w-4 h-4" />
              <span>{t.navbar.explore}</span>
            </span>
          </Link>

          <Link
            to="/preview/studio"
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isCurrent('/preview/studio') || isCurrent('/studio')
                ? 'bg-[#121317] text-white dark:bg-white dark:text-[#121317] shadow-xs'
                : 'text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#1A73E8] dark:text-[#8AB4F8]" />
              <span>Gemini Studio</span>
            </span>
          </Link>              
        </nav>

        {/* Right: Actions, Language Switcher, Theme Toggle & Auth */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Quick Extract Action Pill Button */}
          <Link
            to="/extract"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#1A73E8]/10 text-[#1A73E8] dark:text-[#4285F4] hover:bg-[#1A73E8]/15 border border-[#1A73E8]/20 text-xs font-mono font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.navbar.extractUrl}</span>
          </Link>

          {/* Language Switcher Pill */}
          <button
            onClick={toggleLanguage}
            title={t.navbar.toggleLang}
            aria-label={t.navbar.toggleLang}
            className="h-9 px-2.5 rounded-full flex items-center space-x-1.5 bg-white dark:bg-[#16181D] border border-[#DADCE0] dark:border-[#26282E] text-xs font-mono font-semibold text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white hover:border-[#1A73E8] dark:hover:border-[#4285F4] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-[#1A73E8]" />
            <span className="uppercase">{language}</span>
          </button>

          {/* Theme Switcher Button with Tooltip and Focus Ring */}
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="relative w-9 h-9 rounded-full flex items-center justify-center bg-white dark:bg-[#16181D] border border-[#DADCE0] dark:border-[#26282E] hover:border-[#1A73E8] dark:hover:border-[#4285F4] shadow-2xs hover:shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/30 dark:focus:ring-[#4285F4]/30 cursor-pointer group"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#FBBC05] group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-[#121317] group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* User Auth or Sign In Button */}
          {user ? (
            <div className="flex items-center space-x-2 pl-1">
              <div className="flex items-center space-x-2 py-1 px-3 rounded-full bg-[#F1F3F4] dark:bg-[#1E2128] border border-[#E8EAED] dark:border-[#26282E]">
                <div className="w-5 h-5 rounded-full bg-[#1A73E8] text-white text-[10px] font-mono flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-[#121317] dark:text-white max-w-[90px] truncate hidden sm:block">
                  {user.name}
                </span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  title={t.navbar.signOut}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#EA4335] transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full text-xs font-medium bg-[#121317] text-white dark:bg-white dark:text-[#121317] hover:scale-[0.98] transition-transform flex items-center space-x-1.5 shadow-sm"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>{t.navbar.signIn}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
