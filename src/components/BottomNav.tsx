import { useState } from 'react';
import { Home, Sparkles, Heart, ShoppingBag, Calendar, Scan, LayoutGrid } from 'lucide-react';

interface BottomNavProps {
  activeTab?: string;
  cartCount?: number;
  wishlistCount?: number;
  onSelectTab: (tab: string) => void;
  onOpenScanner?: () => void;
}

export const BottomNav = ({
  activeTab = 'home',
  cartCount = 0,
  wishlistCount = 0,
  onSelectTab,
  onOpenScanner,
}: BottomNavProps) => {
  return (
    <nav
      aria-label="شريط التنقل السفلي العائم"
      className="fixed bottom-3 inset-x-0 z-40 px-4 pointer-events-none"
    >
      {/* Floating Island Capsule Container (Exact match to Screen 2 in image) */}
      <div className="max-w-xs sm:max-w-sm mx-auto bg-white/95 backdrop-blur-lg border border-emerald-950/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-1.5 flex items-center justify-around pointer-events-auto">
        
        {/* 1. Home Tab */}
        <button
          onClick={() => onSelectTab('home')}
          aria-label="الرئيسية"
          className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all ${
            activeTab === 'home'
              ? 'bg-[#EAF5EF] text-[#1F5E4B] shadow-2xs font-bold'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2]" />
        </button>

        {/* 2. Center AI Scan / Diagnosis Capsule Button (Exact match to Screen 2) */}
        <button
          onClick={onOpenScanner || (() => onSelectTab('scan'))}
          aria-label="فحص البشرة بالذكاء الاصطناعي"
          className="w-13 h-13 rounded-full bg-[#162A22] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all relative border-2 border-white"
        >
          <Scan className="w-5 h-5 text-emerald-300 stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF6B81] rounded-full border-2 border-white animate-pulse" />
        </button>

        {/* 3. Daily Routine / Calendar Tab */}
        <button
          onClick={() => onSelectTab('routine')}
          aria-label="روتين فاطمة"
          className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all ${
            activeTab === 'routine'
              ? 'bg-[#EAF5EF] text-[#1F5E4B] shadow-2xs'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-5 h-5 stroke-[2]" />
        </button>

        {/* 4. Cart / Bag Tab with Badge */}
        <button
          onClick={() => onSelectTab('cart')}
          aria-label="سلة التسوق"
          className="w-12 h-12 rounded-full flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 relative transition-all"
        >
          <ShoppingBag className="w-5 h-5 stroke-[2]" />
          {cartCount > 0 && (
            <span className="absolute top-1.5 right-1.5 bg-[#FF6B81] text-white font-latin text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
