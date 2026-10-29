import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Sparkles, X, Lock, KeyRound, ArrowRight } from 'lucide-react';
import { User } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/explore';
  const { language } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate authentic Google OAuth response
    setTimeout(() => {
      const googleUser: User = {
        id: 'usr_google_' + Math.random().toString(36).substring(2, 9),
        name: 'Alexandre Carvalho',
        email: 'alexandre.antigravity@google.com',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
        plan: 'pro'
      };
      onLoginSuccess(googleUser);
      navigate(redirectTarget, { replace: true });
    }, 700);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col justify-end bg-black/60 dark:bg-black/80 backdrop-blur-md z-50 overflow-hidden select-none">
      
      {/* Top Peek Bar with Back / Dismiss Action */}
      <div className="absolute top-0 inset-x-0 h-12 sm:h-16 flex items-center justify-between px-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-mono font-medium text-white/80 hover:text-white px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/40 backdrop-blur-md bg-white/10 transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>{language === 'pt' ? 'Voltar para o site' : 'Back to Site'}</span>
        </Link>

        <div className="flex items-center space-x-2 text-xs font-mono text-white/70">
          <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
          <span>OpenDesignMD</span>
        </div>
      </div>

      {/* Dimmed backdrop click area */}
      <div 
        onClick={handleClose} 
        className="absolute inset-0 z-10 cursor-pointer" 
        title={language === 'pt' ? 'Clique para fechar' : 'Click to close'}
      />

      {/* Full-width Rounded BottomSheet Container */}
      <div className="relative z-30 w-full max-w-4xl mx-auto h-[88vh] sm:h-[86vh] md:h-[84vh] bg-white dark:bg-[#0E1015] border-t border-x border-[#E8EAED] dark:border-[#26282E] rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_-30px_70px_rgba(0,0,0,0.9)] animate-slide-up-sheet flex flex-col justify-between overflow-hidden">
        
        {/* Ambient Top Glow inside Sheet */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] gravity-glow pointer-events-none opacity-90" />

        {/* Top Drag Handle & Close Button Header */}
        <div className="relative px-6 pt-3.5 pb-2 flex items-center justify-between">
          <div className="w-9" /> {/* Spacer for centering the handle */}
          
          {/* Tactile BottomSheet Handle Pill */}
          <div 
            onClick={handleClose}
            className="w-14 h-1.5 rounded-full bg-[#DADCE0] dark:bg-[#2A2E39] hover:bg-[#BDC1C6] dark:hover:bg-[#3C4043] transition-colors cursor-pointer" 
            title={language === 'pt' ? 'Arrastar para fechar' : 'Drag down to close'}
          />

          {/* Close 'X' Button */}
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#121317] dark:hover:text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sheet Main Scrollable Body */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-12 text-center max-w-xl mx-auto w-full">          
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-[#121317] dark:text-white mb-2 leading-tight">
            {language === 'pt' ? 'Entrar no OpenDesignMD' : 'Sign in to OpenDesignMD'}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed max-w-md mb-6 sm:mb-8">
            {language === 'pt'
              ? 'Conecte sua conta do Google para explorar o catálogo de system designs e gerar tokens em DESIGN.md.'
              : 'Connect your Google account to explore the design systems catalog and export normative DESIGN.md tokens.'}
          </p>

          {/* 🌟 CENTERPIECE: Google AI Mode Glowing Capsule Button (Reference: pin/526710118942544821/) */}
          <div className="flex flex-col items-center my-4 sm:my-6 w-full">
            <div className="relative group w-full max-w-[340px] sm:max-w-[400px] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
              
              {/* Volumetric Chromatic Ambient Aura (Google AI Mode glow) */}
              <div className="absolute inset-[-8px] sm:inset-[-12px] rounded-full google-ai-gradient animate-google-glow-spin blur-xl sm:blur-2xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Capsule Border Frame with Flowing Google Conic Beam */}
              <div className="relative p-[2.5px] rounded-full overflow-hidden shadow-2xl">
                <div className="absolute inset-[-150%] google-ai-gradient animate-google-glow-spin pointer-events-none" />

                {/* Inner Capsule Surface */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="relative z-10 w-full h-[58px] sm:h-[64px] rounded-full bg-[#0D0F15] dark:bg-[#0B0D13] text-white flex items-center justify-between px-5 sm:px-7 cursor-pointer border border-white/10 hover:bg-[#13161F] dark:hover:bg-[#12141C] transition-all disabled:opacity-70 group shadow-inner"
                  title={language === 'pt' ? 'Entrar com o Google' : 'Sign in with Google'}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center w-full space-x-3">
                      <div className="w-5 h-5 border-2 border-[#4285F4] border-t-transparent rounded-full animate-spin" />
                      <span className="font-sans font-medium text-sm text-white/90">
                        {language === 'pt' ? 'Autenticando via Google...' : 'Authenticating via Google...'}
                      </span>
                    </div>
                  ) : (
                    <>
                      {/* Left: Google 'G' Mark */}
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 drop-shadow" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                        </div>

                        {/* Center: Text Label */}
                        <span className="font-sans font-medium text-sm sm:text-base tracking-tight text-white group-hover:text-white transition-colors">
                          {language === 'pt' ? 'Continuar com o Google' : 'Continue with Google'}
                        </span>
                      </div>

                      {/* Right: Subtle Google Arrow / Indicator */}
                      <div className="flex items-center space-x-1.5 pl-2 text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                        <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white" />
                      </div>
                    </>
                  )}
                </button>
              </div>
            </div>

            <span className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6] font-mono mt-3">
              {language === 'pt' ? 'Autenticação federada em 1 clique' : '1-click federated authentication'}
            </span>
          </div>

          {/* Trust & Guarantees Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full mt-4 text-left">
            <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-[#E8EAED] dark:border-[#26282E] flex items-center space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-[#34A853] flex-shrink-0" />
              <div className="text-[11px] leading-tight">
                <p className="font-semibold text-[#121317] dark:text-white">OAuth 2.0 PKCE</p>
                <p className="text-[#5F6368] dark:text-[#9AA0A6]">{language === 'pt' ? 'Login federado' : 'Federated SSO'}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-[#E8EAED] dark:border-[#26282E] flex items-center space-x-2.5">
              <KeyRound className="w-4 h-4 text-[#1A73E8] flex-shrink-0" />
              <div className="text-[11px] leading-tight">
                <p className="font-semibold text-[#121317] dark:text-white">{language === 'pt' ? 'Zero Senhas' : 'Passwordless'}</p>
                <p className="text-[#5F6368] dark:text-[#9AA0A6]">{language === 'pt' ? 'Autenticação em 1 clique' : '1-click access'}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-[#E8EAED] dark:border-[#26282E] flex items-center space-x-2.5">
              <Lock className="w-4 h-4 text-[#FBBC05] flex-shrink-0" />
              <div className="text-[11px] leading-tight">
                <p className="font-semibold text-[#121317] dark:text-white">{language === 'pt' ? 'Padrão Google Labs' : 'Google Labs Spec'}</p>
                <p className="text-[#5F6368] dark:text-[#9AA0A6]">{language === 'pt' ? 'Proteção de privacidade' : 'Privacy protection'}</p>
              </div>
            </div>
          </div>

        </div>

        {/* BottomSheet Footer */}
        <div className="relative z-10 px-6 py-4 border-t border-[#E8EAED] dark:border-[#26282E] flex items-center justify-between text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6]">
          <span>OpenDesignMD • Antigravity Engine</span>
          <span>Google OAuth 2.0</span>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
