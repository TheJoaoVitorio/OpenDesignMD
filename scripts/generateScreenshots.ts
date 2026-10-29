import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PREVIEWS_DIR = path.resolve(process.cwd(), 'public', 'previews');

if (!fs.existsSync(PREVIEWS_DIR)) {
  fs.mkdirSync(PREVIEWS_DIR, { recursive: true });
}

interface TargetCompany {
  id: string;
  name: string;
  url: string;
  filename: string;
  fallbackHtml: string;
}

const TARGETS: TargetCompany[] = [
  {
    id: 'google-antigravity',
    name: 'Google Antigravity',
    url: 'https://antigravity.google/product/',
    filename: 'google-antigravity.png',
    fallbackHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Google Sans', 'Inter', sans-serif; }
    body { background: #0D0E12; color: #F3F4F6; min-height: 800px; display: flex; flex-direction: column; overflow: hidden; }
    header { display: flex; justify-content: space-between; align-items: center; padding: 24px 60px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .brand { display: flex; align-items: center; gap: 12px; font-size: 18px; font-weight: 500; letter-spacing: -0.02em; }
    .nav { display: flex; gap: 24px; font-size: 14px; color: #9AA0A6; }
    .hero { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; position: relative; }
    .pill { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 9999px; background: rgba(26,115,232,0.12); color: #4285F4; font-size: 13px; font-family: monospace; border: 1px solid rgba(26,115,232,0.3); margin-bottom: 24px; }
    h1 { font-size: 64px; font-weight: 500; letter-spacing: -0.04em; max-width: 800px; line-height: 1.08; margin-bottom: 24px; color: #FFFFFF; }
    p { font-size: 18px; color: #9AA0A6; max-width: 580px; line-height: 1.6; margin-bottom: 36px; }
    .actions { display: flex; gap: 16px; }
    .btn-primary { background: #FFFFFF; color: #0D0E12; padding: 14px 32px; border-radius: 9999px; font-size: 14px; font-weight: 500; border: none; }
    .btn-sec { background: rgba(255,255,255,0.06); color: #FFFFFF; padding: 14px 28px; border-radius: 9999px; font-size: 14px; border: 1px solid rgba(255,255,255,0.15); }
    .glow { position: absolute; width: 600px; height: 350px; background: radial-gradient(circle, rgba(26,115,232,0.2) 0%, transparent 70%); top: 15%; left: 50%; transform: translateX(-50%); pointer-events: none; filter: blur(40px); }
  </style>
</head>
<body>
  <div class="glow"></div>
  <header>
    <div class="brand">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#1A73E8" stroke-width="2.5"/><circle cx="12" cy="12" r="4" fill="#4285F4"/></svg>
      <span>Google Antigravity</span>
    </div>
    <div class="nav"><span>Features</span><span>Overview</span><span>CLI</span><span>Agents</span></div>
    <button class="btn-primary" style="padding: 8px 20px; font-size: 13px;">Get Started</button>
  </header>
  <div class="hero">
    <div class="pill">● Antigravity 2.0 • Engineered Calm</div>
    <h1>Hyper-focused UI systems for autonomous agents.</h1>
    <p>Normative visual contracts, zero design drift, and quantum-sharp surfaces engineered for code generation.</p>
    <div class="actions">
      <button class="btn-primary">Explore Platform</button>
      <button class="btn-sec">Documentation</button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'stripe',
    name: 'Stripe',
    url: 'https://stripe.com',
    filename: 'stripe.png',
    fallbackHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: #FFFFFF; color: #0A2540; min-height: 800px; display: flex; flex-direction: column; overflow: hidden; position: relative; }
    .mesh { position: absolute; top: -100px; left: -100px; right: -100px; height: 500px; background: linear-gradient(135deg, #FF6B4A 0%, #635BFF 40%, #00D4FF 85%); transform: skewY(-6deg); transform-origin: top left; z-index: 0; opacity: 0.9; }
    header { position: relative; z-index: 10; display: flex; justify-content: space-between; align-items: center; padding: 24px 60px; color: #FFFFFF; }
    .brand { font-size: 26px; font-weight: 800; letter-spacing: -0.04em; }
    .nav { display: flex; gap: 32px; font-size: 15px; font-weight: 500; }
    .hero { position: relative; z-index: 10; flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 60px 80px; max-width: 900px; }
    h1 { font-size: 68px; font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 24px; color: #0A2540; }
    p { font-size: 19px; color: #425466; line-height: 1.6; margin-bottom: 36px; max-width: 600px; }
    .actions { display: flex; gap: 16px; align-items: center; }
    .btn-primary { background: #635BFF; color: #FFFFFF; padding: 14px 28px; border-radius: 9999px; font-size: 15px; font-weight: 600; border: none; box-shadow: 0 4px 12px rgba(99,91,255,0.3); }
    .btn-link { color: #635BFF; font-weight: 600; font-size: 15px; text-decoration: none; margin-left: 12px; }
  </style>
</head>
<body>
  <div class="mesh"></div>
  <header>
    <div class="brand">stripe</div>
    <div class="nav"><span>Products</span><span>Solutions</span><span>Developers</span><span>Pricing</span></div>
    <button class="btn-primary" style="padding: 10px 22px; font-size: 14px; background: rgba(255,255,255,0.2); backdrop-blur: 8px;">Sign in &gt;</button>
  </header>
  <div class="hero">
    <h1>Financial infrastructure for the internet.</h1>
    <p>Millions of companies of all sizes use Stripe online and in person to accept payments, send payouts, and manage their businesses.</p>
    <div class="actions">
      <button class="btn-primary">Start now &gt;</button>
      <a href="#" class="btn-link">Contact sales &gt;</a>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'linear',
    name: 'Linear',
    url: 'https://linear.app',
    filename: 'linear.png',
    fallbackHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; }
    body { background: #08090A; color: #F7F8F8; min-height: 800px; display: flex; flex-direction: column; overflow: hidden; }
    header { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .brand { display: flex; align-items: center; gap: 10px; font-size: 17px; font-weight: 600; letter-spacing: -0.02em; }
    .nav { display: flex; gap: 28px; font-size: 13px; color: #8A8F98; }
    .hero { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; }
    .badge { padding: 4px 12px; border-radius: 9999px; background: rgba(94,106,210,0.15); color: #8F9BF7; font-size: 12px; font-family: monospace; border: 1px solid rgba(94,106,210,0.3); margin-bottom: 24px; }
    h1 { font-size: 64px; font-weight: 600; letter-spacing: -0.04em; max-width: 820px; line-height: 1.1; margin-bottom: 20px; }
    p { font-size: 18px; color: #8A8F98; max-width: 560px; line-height: 1.55; margin-bottom: 32px; }
    .btn-primary { background: #5E6AD2; color: #FFFFFF; padding: 12px 26px; border-radius: 8px; font-size: 14px; font-weight: 500; border: none; box-shadow: 0 0 24px rgba(94,106,210,0.4); }
    .board-preview { width: 780px; height: 260px; background: #101114; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; margin-top: 36px; padding: 20px; display: flex; gap: 16px; }
    .col { flex: 1; background: #16171B; border-radius: 8px; padding: 12px; border: 1px solid rgba(255,255,255,0.04); }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <svg width="20" height="20" viewBox="0 0 100 100" fill="#5E6AD2"><rect width="100" height="100" rx="20"/></svg>
      <span>Linear</span>
    </div>
    <div class="nav"><span>Features</span><span>Method</span><span>Customers</span><span>Changelog</span></div>
    <button class="btn-primary" style="padding: 8px 18px; font-size: 13px;">Sign In</button>
  </header>
  <div class="hero">
    <div class="badge">Linear 2026 Release • Project updates &gt;</div>
    <h1>Linear is a better way<br/>to build products</h1>
    <p>Meet the new standard for modern software development. Streamline issues, sprints, and product roadmaps.</p>
    <button class="btn-primary">Start building &gt;</button>
    <div class="board-preview">
      <div class="col"><div style="height: 12px; width: 60px; background: #333; border-radius: 4px; margin-bottom: 12px;"></div><div style="height: 48px; background: #1F2025; border-radius: 6px;"></div></div>
      <div class="col"><div style="height: 12px; width: 80px; background: #333; border-radius: 4px; margin-bottom: 12px;"></div><div style="height: 48px; background: #1F2025; border-radius: 6px;"></div></div>
      <div class="col"><div style="height: 12px; width: 70px; background: #333; border-radius: 4px; margin-bottom: 12px;"></div><div style="height: 48px; background: #1F2025; border-radius: 6px;"></div></div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'vercel',
    name: 'Vercel',
    url: 'https://vercel.com',
    filename: 'vercel.png',
    fallbackHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Geist', sans-serif; }
    body { background: #000000; color: #FFFFFF; min-height: 800px; display: flex; flex-direction: column; overflow: hidden; }
    header { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; border-bottom: 1px solid #222222; }
    .brand { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 700; }
    .nav { display: flex; gap: 24px; font-size: 14px; color: #888888; }
    .hero { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; }
    h1 { font-size: 72px; font-weight: 800; letter-spacing: -0.05em; line-height: 1.05; margin-bottom: 24px; }
    .grad-text { background: linear-gradient(180deg, #FFFFFF 0%, #777777 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { font-size: 18px; color: #888888; max-width: 580px; line-height: 1.6; margin-bottom: 36px; }
    .actions { display: flex; gap: 14px; }
    .btn-white { background: #FFFFFF; color: #000000; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600; border: none; }
    .btn-ghost { background: transparent; color: #FFFFFF; padding: 12px 28px; border-radius: 6px; font-size: 14px; border: 1px solid #333333; }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <svg width="22" height="19" viewBox="0 0 76 65" fill="#FFFFFF"><path d="M37.5 0L75 65H0L37.5 0Z"/></svg>
      <span>Vercel</span>
    </div>
    <div class="nav"><span>Frameworks</span><span>Products</span><span>Docs</span><span>Enterprise</span></div>
    <button class="btn-white" style="padding: 8px 18px; font-size: 13px;">Sign Up</button>
  </header>
  <div class="hero">
    <h1 class="grad-text">Develop. Preview. Ship.</h1>
    <p>Vercel’s Frontend Cloud gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized Web.</p>
    <div class="actions">
      <button class="btn-white">Start Deploying</button>
      <button class="btn-ghost">Get a Demo</button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'supabase',
    name: 'Supabase',
    url: 'https://supabase.com',
    filename: 'supabase.png',
    fallbackHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: #121212; color: #EDEDED; min-height: 800px; display: flex; flex-direction: column; overflow: hidden; }
    header { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; border-bottom: 1px solid #242424; }
    .brand { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 700; }
    .nav { display: flex; gap: 24px; font-size: 14px; color: #888888; }
    .hero { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; }
    .tag { display: inline-flex; align-items: center; gap: 6px; padding: 4px 14px; border-radius: 9999px; background: rgba(62,207,142,0.1); color: #3ECF8E; font-size: 12px; border: 1px solid rgba(62,207,142,0.25); margin-bottom: 24px; }
    h1 { font-size: 64px; font-weight: 700; letter-spacing: -0.04em; max-width: 820px; line-height: 1.1; margin-bottom: 20px; }
    .emerald { color: #3ECF8E; }
    p { font-size: 18px; color: #888888; max-width: 580px; line-height: 1.6; margin-bottom: 36px; }
    .actions { display: flex; gap: 16px; }
    .btn-emerald { background: #3ECF8E; color: #121212; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600; border: none; }
    .btn-dark { background: #1C1C1C; color: #EDEDED; padding: 12px 28px; border-radius: 6px; font-size: 14px; border: 1px solid #2E2E2E; }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#3ECF8E"><path d="M12 2L2 19.5h10.5L10 22l12-11H12.5L14 2H12z"/></svg>
      <span>Supabase</span>
    </div>
    <div class="nav"><span>Features</span><span>Architecture</span><span>Docs</span><span>Pricing</span></div>
    <button class="btn-emerald" style="padding: 8px 18px; font-size: 13px;">Dashboard</button>
  </header>
  <div class="hero">
    <div class="tag">⚡ Postgres Database &amp; Auth</div>
    <h1>Build in a weekend.<br/><span class="emerald">Scale to millions.</span></h1>
    <p>Supabase is an open source Firebase alternative. Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, and Realtime.</p>
    <div class="actions">
      <button class="btn-emerald">Start your project</button>
      <button class="btn-dark">Documentation</button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'apple',
    name: 'Apple',
    url: 'https://apple.com',
    filename: 'apple.png',
    fallbackHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif; }
    body { background: #000000; color: #F5F5F7; min-height: 800px; display: flex; flex-direction: column; overflow: hidden; }
    header { display: flex; justify-content: center; align-items: center; gap: 40px; padding: 16px 40px; background: rgba(22,22,23,0.8); backdrop-filter: blur(20px); font-size: 12px; color: #A1A1A6; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .hero { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; }
    h1 { font-size: 72px; font-weight: 600; letter-spacing: -0.025em; margin-bottom: 12px; }
    h2 { font-size: 26px; font-weight: 400; color: #86868B; margin-bottom: 28px; }
    .actions { display: flex; gap: 20px; }
    .btn-blue { background: #0071E3; color: #FFFFFF; padding: 12px 26px; border-radius: 9999px; font-size: 14px; font-weight: 500; border: none; }
    .btn-outline { background: transparent; color: #2997FF; padding: 12px 26px; border-radius: 9999px; font-size: 14px; border: 1px solid #2997FF; }
  </style>
</head>
<body>
  <header>
    <span>Store</span><span>Mac</span><span>iPad</span><span>iPhone</span><span>Watch</span><span>Vision</span><span>AirPods</span>
  </header>
  <div class="hero">
    <h1>iPhone 16 Pro</h1>
    <h2>Hello, Apple Intelligence.</h2>
    <div class="actions">
      <button class="btn-blue">Learn more</button>
      <button class="btn-outline">Buy</button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com',
    filename: 'github.png',
    fallbackHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', sans-serif; }
    body { background: #0D1117; color: #FFFFFF; min-height: 800px; display: flex; flex-direction: column; overflow: hidden; }
    header { display: flex; justify-content: space-between; align-items: center; padding: 18px 60px; border-bottom: 1px solid #21262D; }
    .brand { font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
    .nav { display: flex; gap: 24px; font-size: 14px; color: #8B949E; }
    .hero { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; }
    h1 { font-size: 68px; font-weight: 700; letter-spacing: -0.03em; max-width: 820px; line-height: 1.1; margin-bottom: 24px; }
    p { font-size: 20px; color: #8B949E; max-width: 620px; line-height: 1.55; margin-bottom: 36px; }
    .form { display: flex; gap: 12px; }
    input { width: 340px; padding: 14px 20px; border-radius: 6px; background: #161B22; border: 1px solid #30363D; color: #FFFFFF; font-size: 14px; }
    .btn-green { background: #238636; color: #FFFFFF; padding: 14px 28px; border-radius: 6px; font-size: 14px; font-weight: 600; border: 1px solid rgba(240,246,252,0.1); }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <svg height="28" width="28" viewBox="0 0 16 16" fill="#FFFFFF"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
      <span>GitHub</span>
    </div>
    <div class="nav"><span>Product</span><span>Solutions</span><span>Open Source</span><span>Pricing</span></div>
    <button class="btn-green" style="padding: 8px 18px; font-size: 13px;">Sign up</button>
  </header>
  <div class="hero">
    <h1>The AI-powered developer platform</h1>
    <p>Millions of developers and organizations build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.</p>
    <div class="form">
      <input placeholder="Enter your email" />
      <button class="btn-green">Sign up for GitHub</button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'raycast',
    name: 'Raycast',
    url: 'https://raycast.com',
    filename: 'raycast.png',
    fallbackHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; }
    body { background: #0D0D11; color: #FFFFFF; min-height: 800px; display: flex; flex-direction: column; overflow: hidden; }
    header { display: flex; justify-content: space-between; align-items: center; padding: 22px 60px; border-bottom: 1px solid #191921; }
    .brand { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 700; }
    .nav { display: flex; gap: 24px; font-size: 14px; color: #959DA6; }
    .hero { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; }
    .coral { color: #FF6363; }
    h1 { font-size: 68px; font-weight: 800; letter-spacing: -0.04em; max-width: 820px; line-height: 1.1; margin-bottom: 20px; }
    p { font-size: 19px; color: #959DA6; max-width: 580px; line-height: 1.6; margin-bottom: 36px; }
    .btn-coral { background: #FF6363; color: #FFFFFF; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 600; border: none; box-shadow: 0 0 30px rgba(255,99,99,0.35); }
    .search-mock { margin-top: 40px; width: 620px; background: #191921; border: 1px solid #282833; border-radius: 14px; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF6363"><rect width="24" height="24" rx="6"/></svg>
      <span>Raycast</span>
    </div>
    <div class="nav"><span>Store</span><span>Developer</span><span>Pro</span><span>Changelog</span></div>
    <button class="btn-coral" style="padding: 8px 18px; font-size: 13px;">Download</button>
  </header>
  <div class="hero">
    <h1>Your shortcut to<br/><span class="coral">everything.</span></h1>
    <p>Raycast is a blazingly fast, totally extendable launcher. It lets you complete tasks, calculate, share common links, and much more.</p>
    <button class="btn-coral">Download for Mac &amp; Windows</button>
    <div class="search-mock">
      <span style="color: #666; font-size: 15px;">Search apps, commands, extensions...</span>
      <span style="background: #282833; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-family: monospace;">⌘ K</span>
    </div>
  </div>
</body>
</html>`
  }
];

async function generateAll() {
  console.log('[Screenshots] Launching Chrome at:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1280,800'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  );

  for (const target of TARGETS) {
    const outputPath = path.join(PREVIEWS_DIR, target.filename);
    console.log(`\n[Screenshots] Processing ${target.name} (${target.url})...`);

    let capturedLive = false;
    try {
      // Try live navigation with 10s timeout
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 10000 });
      // Short delay for fonts and critical styling
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: outputPath, type: 'png' });
      console.log(`  ✓ Successfully captured LIVE screenshot: ${target.filename}`);
      capturedLive = true;
    } catch (err: any) {
      console.log(`  ⚠ Live capture failed for ${target.name} (${err.message}). Using high-fidelity brand template.`);
    }

    if (!capturedLive) {
      // Fallback: load high-fidelity HTML and capture
      await page.setContent(target.fallbackHtml, { waitUntil: 'load' });
      await new Promise(r => setTimeout(r, 500));
      await page.screenshot({ path: outputPath, type: 'png' });
      console.log(`  ✓ Successfully generated BRAND MOCKUP screenshot: ${target.filename}`);
    }
  }

  await browser.close();
  console.log('\n[Screenshots] All 8 previews generated in:', PREVIEWS_DIR);
}

generateAll().catch(err => {
  console.error('[Screenshots] Error:', err);
  process.exit(1);
});
