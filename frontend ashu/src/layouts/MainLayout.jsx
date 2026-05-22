import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Search, 
  Cpu, 
  Home, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Beautiful SVG representation of the official Uttar Pradesh Government Emblem
const UpGovEmblem = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={`${className} text-slate-800`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" fill="#f8fafc"/>
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2"/>
    {/* Bow and Arrow */}
    <path d="M 32 38 Q 50 18 68 38" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <line x1="50" y1="28" x2="50" y2="44" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M 47 44 L 50 48 L 53 44 Z" fill="currentColor"/>
    {/* Two fishes */}
    <path d="M 28 56 C 24 64 36 70 40 64 C 36 58 30 50 28 56 Z" fill="currentColor"/>
    <path d="M 72 56 C 76 64 64 70 60 64 C 64 58 70 50 72 56 Z" fill="currentColor"/>
    {/* Confluent rivers waves (Triveni Sangam) */}
    <path d="M 20 78 Q 35 73 50 78 T 80 78" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    <path d="M 24 82 Q 37 78 50 82 T 76 82" stroke="currentColor" strokeWidth="1" fill="none"/>
  </svg>
);

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Portal Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Submit Grievance', path: '/submit', icon: <PlusCircle className="w-5 h-5" /> },
    { name: 'Track Grievance', path: '/track', icon: <Search className="w-5 h-5" /> },
    { name: 'Admin Console', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'AI Monitoring Panel', path: '/ai-monitor', icon: <Cpu className="w-5 h-5" /> },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col transition-colors duration-200 font-sans">
      
      {/* Top Banner (UP Government Helplines & Language) */}
      <div className="fixed top-0 left-0 right-0 h-[34px] bg-slate-900 text-slate-200 z-50 text-[10px] sm:text-[11px] font-semibold px-4 lg:px-8 flex justify-between items-center border-b border-slate-800 shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="text-slate-300 select-none font-bold">उत्तर प्रदेश सरकार | Govt. of Uttar Pradesh</span>
          <span className="text-slate-700 hidden md:inline">|</span>
          <span className="hidden md:inline select-none text-slate-400">लखनऊ नगर निगम (Lucknow Nagar Nigam)</span>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="text-orange-400 flex items-center select-none font-bold"><PhoneCall className="w-3 h-3 mr-1" /> मुख्यमंत्री हेल्पलाइन: 1076</span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center select-none text-slate-300"><PhoneCall className="w-3 h-3 mr-1" /> नगर निगम: 1533</span>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5 text-slate-300 font-bold">
            <button className="hover:text-white cursor-pointer transition-colors text-blue-400">English</button>
            <span>/</span>
            <button className="hover:text-white cursor-pointer transition-colors">हिन्दी</button>
          </div>
        </div>
      </div>

      {/* Tricolor Accent Bar */}
      <div className="fixed top-[34px] left-0 right-0 h-[3px] flex z-50 select-none">
        <div className="bg-[#FF9933] flex-1"></div>
        <div className="bg-white flex-1"></div>
        <div className="bg-[#138808] flex-1"></div>
      </div>

      {/* Desktop Sidebar (Solid Corporate style) */}
      <aside className="hidden lg:flex flex-col w-64 fixed top-[37px] bottom-0 left-0 z-40 border-r border-slate-200 bg-white p-4">
        
        {/* Brand / UP Government Logo Header */}
        <div className="flex items-center space-x-3 px-1 py-3 mb-6 border-b border-slate-200">
          <UpGovEmblem className="w-10 h-10 shrink-0" />
          <div className="leading-tight">
            <h1 className="text-[11px] font-black tracking-tight text-slate-900 uppercase">
              जनमित्र पोर्टल
            </h1>
            <span className="text-[10px] font-extrabold text-blue-900 block">
              JanMitra Portal
            </span>
            <span className="text-[8px] font-bold uppercase text-slate-500 block select-none">
              Lucknow Nagar Nigam
            </span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                  isActive 
                    ? 'bg-blue-50 border-l-4 border-blue-800 text-blue-800 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={isActive ? 'text-blue-800' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-800" />}
              </Link>
            );
          })}
        </nav>

        {/* Official Hub Info Footer */}
        <div className="mt-auto p-3 rounded-lg border border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-2 text-[9px] font-black text-slate-700 uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>एकीकृत शिकायत प्रणाली</span>
          </div>
          <p className="text-[9px] text-slate-550 leading-relaxed font-semibold">
            Integrated system linked with UP Jansunwai & Lucknow municipal ward officers.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 z-10 pt-[37px] relative">
        
        {/* Sticky Header (Solid White style) */}
        <header className="sticky top-[37px] z-30 flex items-center justify-between px-4 lg:px-8 py-3 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          
          {/* Mobile menu toggle */}
          <button 
            onClick={toggleMobileMenu} 
            className="lg:hidden p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Info */}
          <div className="hidden sm:flex items-center space-x-3">
            <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100 text-[10px] font-black uppercase tracking-wider select-none">
              Lucknow Nagar Nigam
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest select-none">
              Secure Citizen Desk
            </span>
          </div>

          <div className="sm:hidden flex items-center space-x-2">
            <UpGovEmblem className="w-8 h-8" />
            <span className="font-black text-xs text-blue-900 uppercase">JanMitra</span>
          </div>

          {/* Profile Action */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-700 select-none">
              <div className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center font-bold text-white text-[10px]">
                L
              </div>
              <span className="hidden sm:inline font-bold">Lucknow Node Active</span>
              <span className="sm:hidden font-bold">LKO</span>
            </div>
          </div>
        </header>

        {/* Inner Pages Route View */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer (Solid White) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-slate-900/40 z-45 lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-64 z-50 bg-white p-4 flex flex-col lg:hidden border-r border-slate-200"
            >
              <div className="flex items-center justify-between py-3 mb-6 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <UpGovEmblem className="w-9 h-9" />
                  <div className="leading-tight">
                    <span className="text-xs font-black text-slate-950 uppercase block">
                      जनमित्र पोर्टल
                    </span>
                    <span className="text-[10px] font-extrabold text-blue-700 block">
                      JanMitra Portal
                    </span>
                  </div>
                </div>
                <button 
                  onClick={toggleMobileMenu} 
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <nav className="flex-1 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                          : 'text-slate-655 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 mt-auto">
                <div className="flex items-center space-x-2 text-[10px] font-black text-slate-700 uppercase mb-1">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Official Portal</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                  Lucknow Division Node. Connected to UP Shasan.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;
