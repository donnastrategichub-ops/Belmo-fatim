import React from 'react';
import { Search, Menu, ShoppingBag, Heart } from 'lucide-react';

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
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  activeCategory = 'all',
  onTabChange,
  onSelectCategory,
  onOpenCart,
  onOpenSearch,
  onOpenMenu,
}) => {
  const categories = [
    { id: 'all', labelAr: 'الكل' },
    { id: 'rose-berry', labelAr: 'Rose Berry 🇦🇪' },
    { id: 'fatima-picks', labelAr: 'روتين فاطمة ✨' },
    { id: 'korean-skin', labelAr: 'العناية الكورية 🌿' },
    { id: 'routines', labelAr: 'البروتوكولات والعناية' },
    { id: 'gift-sets', labelAr: 'بوكسات الهدايا 🎁' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 w-full max-w-full">
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-5 pt-3 pb-2 space-y-2">
        
        {/* TOP ROW: Brand Identity, Search Access & Action Icons */}
        <div className="flex items-center justify-between gap-3">
          
          {/* Menu Trigger & Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenMenu}
              aria-label="القائمة الرئيسية"
              className="w-9 h-9 rounded-xl hover:bg-slate-100 active:scale-95 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Belmo Logo */}
            <div
              onClick={() => onTabChange('home')}
              className="cursor-pointer select-none flex items-baseline group"
              role="button"
              tabIndex={0}
            >
              <span className="font-latin tracking-tight text-2xl font-black text-[#1F5E4B] lowercase">
                belmo
              </span>
              <span className="text-[#FF4D6D] text-sm font-black -mt-1 mr-0.5">.</span>
            </div>
          </div>

          {/* Desktop Search Bar (Mid & Large screens) */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="بحث في المنتجات"
              className="w-full h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-xl px-3.5 flex items-center justify-between gap-2 cursor-pointer transition-colors text-right"
            >
              <div className="flex items-center gap-2 text-slate-400 min-w-0">
                <Search className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span className="text-xs text-slate-500 font-medium truncate">
                  ابحثي في Rose Berry، العناية الكورية، البوكسات...
                </span>
              </div>
            </button>
          </div>

          {/* Actions: Search (Mobile), Wishlist & Shopping Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="بحث"
              className="md:hidden w-9 h-9 rounded-xl hover:bg-slate-100 active:scale-95 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search className="w-4.5 h-4.5 stroke-[2]" />
            </button>

            {/* Wishlist Icon */}
            <button
              type="button"
              onClick={() => onTabChange('wishlist')}
              aria-label="المفضلة"
              className="w-9 h-9 rounded-xl hover:bg-slate-100 active:scale-95 text-slate-700 flex items-center justify-center relative transition-colors cursor-pointer"
            >
              <Heart className="w-4.5 h-4.5 stroke-[2]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF4D6D] ring-2 ring-white" />
              )}
            </button>

            {/* Shopping Bag / Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`سلة التسوق (${cartCount} منتجات)`}
              className="min-h-[36px] px-3 rounded-xl bg-[#1F5E4B] hover:bg-[#164336] text-white flex items-center justify-center gap-1.5 relative active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2]" />
              <span className="text-xs font-bold font-latin">{cartCount}</span>
            </button>
          </div>

        </div>

        {/* HORIZONTAL CATEGORY SCROLL NAVIGATION */}
        <nav
          aria-label="فئات المنتجات"
          className="w-full overflow-x-auto no-scrollbar flex items-center gap-1.5 pt-1 pb-1"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#1F5E4B] text-white shadow-2xs font-black'
                    : 'bg-slate-100/80 hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                <span>{cat.labelAr}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};

