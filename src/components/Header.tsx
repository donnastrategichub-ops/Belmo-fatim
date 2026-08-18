import { useState } from 'react';
import { Search, SlidersHorizontal, Menu, Home, Heart, User, ShoppingBag, Sparkles, LayoutGrid, Bell } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  activeTab: string;
  activeCategory?: string;
  onTabChange: (tab: string) => void;
  onSelectCategory?: (cat: string) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
  onOpenFilter?: () => void;
  onOpenScanner?: () => void;
}

export const Header = ({
  cartCount,
  wishlistCount,
  activeTab,
  activeCategory = 'all',
  onTabChange,
  onSelectCategory,
  onOpenCart,
  onOpenSearch,
  onOpenMenu,
  onOpenFilter,
  onOpenScanner,
}: HeaderProps) => {
  const categories = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'face', labelAr: 'الوجه', labelEn: 'Face' },
    { id: 'serums', labelAr: 'سيروم', labelEn: 'Serums' },
    { id: 'sunscreen', labelAr: 'واقي شمس', labelEn: 'Sun' },
    { id: 'moisturizer', labelAr: 'ترطيب', labelEn: 'Moisture' },
    { id: 'body', labelAr: 'الجسم', labelEn: 'Body' },
    { id: 'lip-eye', labelAr: 'شفاه وعيون', labelEn: 'Lip & Eye' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#EDF3EE]/95 backdrop-blur-md border-b border-emerald-950/5">
      
      {/* 1. Ultra-clean Top Bar: Greeting & Grid Menu (Exact match to Screen 2 in image) */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between gap-2 max-w-5xl mx-auto">
        {/* Right side: Personalized Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMenu}
            aria-label="القائمة الرئيسية"
            className="w-11 h-11 rounded-full bg-white border border-emerald-950/5 text-slate-800 flex items-center justify-center shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <LayoutGrid className="w-5 h-5 stroke-[2]" />
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-bold text-slate-500 font-latin">Hello</span>
              <span className="text-sm sm:text-base font-black text-slate-900 font-latin">Fatima's Glow</span>
              <span className="text-[#FF6B81] font-bold">✨</span>
            </div>
            <p className="text-[10.5px] sm:text-[11.5px] text-slate-500 font-arabic font-medium leading-none mt-0.5">
              رفيقة عنايتك بالبشرة الكورية هنا!
            </p>
          </div>
        </div>

        {/* Left side: Brand Logo & Cart Icon */}
        <div className="flex items-center gap-2">
          {/* Brand Logo */}
          <div
            onClick={() => onTabChange('home')}
            className="cursor-pointer select-none px-2 flex items-center"
            role="button"
            tabIndex={0}
          >
            <span className="font-latin tracking-tight text-xl sm:text-2xl font-bold text-[#1F5E4B] lowercase">
              belmo
            </span>
            <span className="text-[#FF6B81] text-lg font-bold -mt-2 mr-0.5">⁺</span>
          </div>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            aria-label="سلة التسوق"
            className="w-11 h-11 rounded-full bg-white border border-emerald-950/5 text-slate-800 flex items-center justify-center relative shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <ShoppingBag className="w-4.5 h-4.5 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-[#FF6B81] text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center font-latin border-2 border-white shadow-2xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Sleek Capsule Search Bar */}
      <div className="px-4 py-1.5 max-w-5xl mx-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="بحث في المنتجات"
          className="flex-1 min-h-[44px] bg-white border border-emerald-950/5 hover:border-emerald-950/15 rounded-full px-4 flex items-center gap-2.5 cursor-pointer shadow-2xs transition-colors text-right"
        >
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-400 flex-1 truncate font-arabic">
            ابحثي عن منتجات أصلية، سيرومات، أو روتينك...
          </span>
        </button>

        {/* Filter Button */}
        <button
          type="button"
          onClick={onOpenFilter || onOpenSearch}
          aria-label="تصفية"
          className="min-h-[44px] px-4 bg-white border border-emerald-950/5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 transition-colors shrink-0"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>تصفية</span>
        </button>
      </div>

      {/* 3. Category Pills Row (Exact match to Screen 2 in image) */}
      <div className="px-4 pb-2.5 pt-1 max-w-5xl mx-auto overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                isActive
                  ? 'bg-[#162A22] text-white shadow-xs'
                  : 'bg-white/80 hover:bg-white text-slate-600 border border-emerald-950/5'
              }`}
            >
              <span>{cat.labelAr}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
