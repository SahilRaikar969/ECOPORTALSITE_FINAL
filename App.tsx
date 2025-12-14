import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import { Tab } from './types';
import LCATracker from './components/LCATracker';
import EcoPointsSimulator from './components/EcoPointsSimulator';
import ResearchFindings from './components/ResearchFindings';

import {
  Calculator,
  FlaskConical,
  Github,
  Sparkles
} from 'lucide-react';

/* ---------- Layout Wrapper ---------- */
const AppLayout: React.FC = () => {
  const location = useLocation();
  const isLcaPage = location.pathname.startsWith('/lca/');
  const [activeTab, setActiveTab] = useState<Tab>(Tab.SIMULATOR);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-gradient-to-br from-eco-100 via-sky-50 to-eco-50 selection:bg-eco-200">

      {/* ---------- Header (ALWAYS VISIBLE) ---------- */}
      <header className="bg-white/70 backdrop-blur-xl text-eco-900 shadow-lg shadow-eco-100/20 sticky top-0 z-50 border-b border-white/50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-eco-700 via-eco-600 to-sky-600 bg-clip-text text-transparent">
                EcoPortal LCA Tracker
              </h1>
              <p className="text-eco-700/80 text-xs md:text-sm mt-1 font-medium flex items-center gap-2 justify-center md:justify-start">
                <Sparkles className="w-3 h-3 text-solar-500 animate-pulse" />
                An Incentive-Powered Digital Framework
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- MAIN WEBSITE NAV (HIDDEN ON LCA PAGES) ---------- */}
      {!isLcaPage && (
        <nav className="bg-white/30 backdrop-blur-md shadow-sm z-40 border-b border-white/20 sticky top-[85px] md:top-[96px]">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <div className="flex justify-center md:justify-start gap-4">
              <button
                onClick={() => setActiveTab(Tab.SIMULATOR)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs md:text-sm uppercase transition-all ${
                  activeTab === Tab.SIMULATOR
                    ? 'bg-gradient-to-r from-eco-600 to-emerald-600 text-white'
                    : 'bg-white/60 text-eco-800'
                }`}
              >
                <Calculator className="w-4 h-4" />
                Simulator
              </button>

              <button
                onClick={() => setActiveTab(Tab.RESEARCH)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs md:text-sm uppercase transition-all ${
                  activeTab === Tab.RESEARCH
                    ? 'bg-gradient-to-r from-eco-600 to-emerald-600 text-white'
                    : 'bg-white/60 text-eco-800'
                }`}
              >
                <FlaskConical className="w-4 h-4" />
                Research
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        {!isLcaPage && activeTab === Tab.SIMULATOR && <EcoPointsSimulator />}
        {!isLcaPage && activeTab === Tab.RESEARCH && <ResearchFindings />}

        <Routes>
          <Route path="/lca/:productId" element={<LCATracker />} />
        </Routes>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="bg-gradient-to-b from-eco-900 via-emerald-950 to-slate-950 text-eco-100/60 py-12 text-center text-sm mt-12 border-t border-eco-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
          <p className="tracking-wide text-base">
            &copy; {new Date().getFullYear()} EcoPortal Project.
            <span className="text-solar-500 font-bold"> Innovating for Earth.</span>
          </p>
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <Github className="w-4 h-4" />
            <span className="font-medium">Open Source Initiative</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ---------- App Wrapper ---------- */
const App: React.FC = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
