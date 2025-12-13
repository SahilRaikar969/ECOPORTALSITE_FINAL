import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Tab } from './types';
import LCATracker from './components/LCATracker';
import EcoPointsSimulator from './components/EcoPointsSimulator';
import ResearchFindings from './components/ResearchFindings';
import { BarChart3, Calculator, FlaskConical, Github, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.SIMULATOR); // Default manual tab

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-gradient-to-br from-eco-100 via-sky-50 to-eco-50 selection:bg-eco-200">
        
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-xl text-eco-900 shadow-lg shadow-eco-100/20 sticky top-0 z-50 border-b border-white/50 transition-all duration-300">
          <div className="max-w-6xl mx-auto px-4 py-4 md:py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left group cursor-pointer">
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-eco-700 via-eco-600 to-sky-600 bg-clip-text text-transparent drop-shadow-sm group-hover:scale-[1.01] transition-transform">
                  EcoPortal LCA Tracker
                </h1>
                <p className="text-eco-700/80 text-xs md:text-sm mt-1 font-medium tracking-wide flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-3 h-3 text-solar-500 animate-pulse" />
                  An Incentive-Powered Digital Framework
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation (Manual Tabs for Simulator & Research) */}
        <nav className="bg-white/30 backdrop-blur-md shadow-sm z-40 border-b border-white/20 sticky top-[85px] md:top-[96px]">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <div className="flex justify-center md:justify-start gap-2 md:gap-4 overflow-x-auto no-scrollbar p-1">
              <button
                onClick={() => setActiveTab(Tab.SIMULATOR)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 whitespace-nowrap border ${
                  activeTab === Tab.SIMULATOR
                    ? 'bg-gradient-to-r from-eco-600 to-emerald-600 text-white shadow-lg shadow-eco-600/30 border-transparent'
                    : 'bg-white/60 text-eco-800 hover:bg-white hover:text-eco-900 border-white/50 hover:border-white shadow-sm'
                }`}
              >
                <Calculator className={`w-4 h-4 ${activeTab === Tab.SIMULATOR ? 'text-solar-300' : 'text-eco-600'}`} />
                Simulator
              </button>
              <button
                onClick={() => setActiveTab(Tab.RESEARCH)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 whitespace-nowrap border ${
                  activeTab === Tab.RESEARCH
                    ? 'bg-gradient-to-r from-eco-600 to-emerald-600 text-white shadow-lg shadow-eco-600/30 border-transparent'
                    : 'bg-white/60 text-eco-800 hover:bg-white hover:text-eco-900 border-white/50 hover:border-white shadow-sm'
                }`}
              >
                <FlaskConical className={`w-4 h-4 ${activeTab === Tab.RESEARCH ? 'text-solar-300' : 'text-eco-600'}`} />
                Research
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 transition-all duration-500 ease-in-out">
          {/* Manual Tabs */}
          {activeTab === Tab.SIMULATOR && <EcoPointsSimulator />}
          {activeTab === Tab.RESEARCH && <ResearchFindings />}

          {/* LCA Tracker Routes (Dedicated URLs) */}
          <Routes>
            <Route path="/lca/:productId" element={<LCATracker />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-eco-900 via-emerald-950 to-slate-950 text-eco-100/60 py-12 text-center text-sm mt-12 border-t border-eco-800 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-eco-500 to-transparent opacity-50"></div>
          <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6 relative z-10">
            <p className="tracking-wide text-base">
              &copy; {new Date().getFullYear()} EcoPortal Project. <span className="text-solar-500 font-bold">Innovating for Earth.</span>
            </p>
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/10">
              <Github className="w-4 h-4 group-hover:text-white transition-colors" />
              <span className="group-hover:text-white transition-colors font-medium">Open Source Initiative</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
