import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { PlatformDashboard } from './components/PlatformDashboard';
import { DesignSystemDetailPage } from './pages/DesignSystemDetailPage';
import { ExtractPage } from './pages/ExtractPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { mockCompanies } from './data/mockCompanies';
import { normalizeCompany } from './utils/normalizeCompany';
import { Company, User } from './types';
import { Check } from 'lucide-react';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import { useLenis } from './hooks/useLenis';

export function AppContent() {
  const location = useLocation();
  const { t, language } = useTranslation();
  useLenis();

  const isLoginPage = location.pathname === '/login';

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('opendesignmd_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {
      // Fallback
    }
    return 'dark';
  });

  const [companies, setCompanies] = useState<Company[]>(() => mockCompanies.map(normalizeCompany));

  // Initialize user from persistent storage (null if not logged in)
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('opendesignmd_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme with document class, body and persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('opendesignmd_theme', theme);
    } catch (e) {}

    const root = document.documentElement;
    const body = document.body;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.add('dark');
      body.classList.remove('light');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      body.classList.remove('dark');
      body.classList.add('light');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // Fetch updated companies from backend if available and normalize them
  useEffect(() => {
    fetch('/api/companies')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.companies && Array.isArray(data.companies) && data.companies.length > 0) {
          const normalizedBackend: Company[] = data.companies.map((c: any) => normalizeCompany(c));
          const backendIds = new Set(normalizedBackend.map((c) => c.id));
          const localOnly = mockCompanies.filter((c) => !backendIds.has(c.id)).map(normalizeCompany);
          setCompanies([...normalizedBackend, ...localOnly]);
        }
      })
      .catch(() => {
        // Fallback to local mockCompanies
      });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2800);
  };

  const handleExtractionComplete = (newCompany: Company) => {
    setCompanies((prev) => {
      const exists = prev.some((c) => c.id === newCompany.id);
      if (exists) {
        return prev.map((c) => (c.id === newCompany.id ? newCompany : c));
      }
      return [newCompany, ...prev];
    });
    showToast(language === 'pt' ? `Adicionado ${newCompany.name} ao catálogo` : `Added ${newCompany.name} to design systems catalog`);
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    try {
      localStorage.setItem('opendesignmd_user', JSON.stringify(loggedInUser));
    } catch {}
    showToast(language === 'pt' ? `Conectado como ${loggedInUser.name}` : `Signed in as ${loggedInUser.name}`);
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('opendesignmd_user');
    } catch {}
    showToast(language === 'pt' ? 'Sessão encerrada com sucesso' : 'Signed out successfully');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#121317] dark:bg-[#0D0E12] dark:text-[#F3F4F6] transition-colors duration-200">
      {/* Navigation Bar - Hidden on /login */}
      {!isLoginPage && (
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Main Routes Outlet with textSwap key on language */}
      <main key={language} className="flex-1 animate-text-swap">
        <Routes>
          {/* Public Landing Page */}
          <Route
            path="/"
            element={
              <LandingPage
                featuredCompanies={companies}
                onShowToast={showToast}
              />
            }
          />

          {/* Standalone Google Login Page */}
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />

          {/* Protected Catalog Dashboard */}
          <Route
            path="/explore"
            element={
              <ProtectedRoute user={user}>
                <PlatformDashboard
                  companies={companies}
                  onShowToast={showToast}
                />
              </ProtectedRoute>
            }
          />

          {/* Friendly aliases */}
          <Route path="/platform" element={<Navigate to="/explore" replace />} />
          <Route path="/systems" element={<Navigate to="/explore" replace />} />

          {/* Protected Details Page */}
          <Route
            path="/system/:id"
            element={
              <ProtectedRoute user={user}>
                <DesignSystemDetailPage
                  companies={companies}
                  onShowToast={showToast}
                />
              </ProtectedRoute>
            }
          />

          {/* Protected Extraction Engine */}
          <Route
            path="/extract"
            element={
              <ProtectedRoute user={user}>
                <ExtractPage
                  onExtractionComplete={handleExtractionComplete}
                  onShowToast={showToast}
                />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className="px-4 py-2.5 rounded-full bg-[#121317] text-white dark:bg-white dark:text-[#121317] text-xs font-mono font-medium shadow-2xl flex items-center space-x-2 border border-white/10 dark:border-black/10">
            <Check className="w-3.5 h-3.5 text-[#34A853]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer - Hidden on /login */}
      {!isLoginPage && (
        <footer className="border-t border-[#E8EAED] dark:border-[#1E2128] bg-white/40 dark:bg-[#0D0E12]/40 backdrop-blur-md py-10 transition-colors">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <img src="/logo.png" alt="OpenDesignMD" className="w-full h-full object-contain" />
              </div>
              <span className="font-sans font-medium text-sm text-[#121317] dark:text-white">
                OpenDesignMD
              </span>
              <span className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">
                • {t.footer.slogan}
              </span>
            </div>

            <div className="flex items-center space-x-6 text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6]">
              <a
                href="https://github.com/google-labs-code/design.md"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#121317] dark:hover:text-white transition-colors"
              >
                {t.footer.specLink}
              </a>
              <a
                href="https://antigravity.google"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#121317] dark:hover:text-white transition-colors"
              >
                {t.footer.antigravityLink}
              </a>
              <a
                href="https://github.com/morluto/rea"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#121317] dark:hover:text-white transition-colors"
              >
                {t.footer.reaLink}
              </a>
            </div>

            <div className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] flex items-center space-x-1">
              <span>{t.footer.builtWith}</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
