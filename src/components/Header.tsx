import { Search, SlidersHorizontal, LayoutGrid, ShoppingBag } from 'lucide-react';

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
  activeCategory = 'all',
  onTabChange,
  onSelectCategory,
  onOpenCart,
  onOpenSearch,
  onOpenMenu,
  onOpenFilter,
}: HeaderProps) => {
  const categories = [
    { id: 'all', labelAr: 'الكل' },
    { id: 'korean-skin', labelAr: 'العناية الكورية 🇰🇷' },
    { id: 'rose-berry', labelAr: 'مكياج روز بيري 🇦🇪' },
    { id: 'gift-sets', labelAr: 'بوكسات وكوفريات 🎁' },
    { id: 'serums', labelAr: 'سيرومات' },
    { id: 'cleanser', labelAr: 'غسول وتنظيف' },
    { id: 'sunscreen', labelAr: 'واقي شمس' },
    { id: 'moisturizer', labelAr: 'ترطيب وترميم' },
    { id: 'under-200', labelAr: 'أقل من 200 DH' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#EDF3EE]/95 backdrop-blur-md border-b border-emerald-950/5 w-full max-w-full">
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-2 space-y-2">
        
        {/* ROW 1: Compact Top Bar (Menu + Fatima's Glow + Belmo Logo + Cart Icon) */}
        <div className="flex items-center justify-between gap-2">
          
          {/* Right Side (RTL): Menu Drawer & Ambassador Greeting */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onOpenMenu}
              aria-label="القائمة الرئيسية"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-emerald-950/5 text-slate-800 flex items-center justify-center shadow-2xs hover:bg-slate-50 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
            </button>

            <div className="min-w-0 text-right">
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm font-bold text-slate-500 font-latin">Hello</span>
                <span className="text-xs sm:text-sm font-black text-slate-900 font-latin truncate">Fatima's Glow</span>
                <span className="text-[#FF6B81] text-xs">✨</span>
              </div>
              <p className="text-[10px] text-slate-500 font-arabic leading-none truncate hidden sm:block">
                عناية كورية أصلية 100%
              </p>
            </div>
          </div>

          {/* Left Side (RTL): Brand Logo & Header Cart Access with Badge */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Brand Logo */}
            <div
              onClick={() => onTabChange('home')}
              className="cursor-pointer select-none px-1 flex items-center"
              role="button"
              tabIndex={0}
            >
              <span className="font-latin tracking-tight text-xl sm:text-2xl font-black text-[#1F5E4B] lowercase">
                belmo
              </span>
              <span className="text-[#FF6B81] text-base font-bold -mt-2 mr-0.5">⁺</span>
            </div>

            {/* Header Cart Icon (Tappable with clear count badge) */}
            <button
              onClick={onOpenCart}
              aria-label={`سلة التسوق (${cartCount} منتجات)`}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-emerald-950/10 text-[#1F5E4B] flex items-center justify-center relative shadow-2xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF4D6D] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center font-latin border-2 border-white shadow-2xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ROW 2: Responsive Full-Width Search & Filter Bar */}
        <div className="flex items-center gap-2 w-full">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="بحث في المنتجات"
            className="flex-1 min-h-[40px] sm:min-h-[42px] bg-white border border-emerald-950/5 hover:border-emerald-950/20 rounded-full px-3.5 flex items-center gap-2 cursor-pointer shadow-2xs transition-colors text-right min-w-0"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-400 flex-1 truncate font-arabic">
              ابحثي عن منتجات أصلية، سيرومات، أو روتينك...
            </span>
          </button>

          {/* Filter Button */}
          <button
            type="button"
            onClick={onOpenFilter || onOpenSearch}
            aria-label="تصفية"
            className="min-h-[40px] sm:min-h-[42px] px-3.5 bg-white border border-emerald-950/5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="text-xs">تصفية</span>
          </button>
        </div>

        {/* ROW 3: Horizontal Category Chips (Contained scroll container, zero page overflow) */}
        <div className="w-full overflow-x-auto no-scrollbar flex items-center gap-1.5 pt-0.5 pb-0.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-2xs cursor-pointer shrink-0 ${
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

      </div>
    </header>
  );
};
