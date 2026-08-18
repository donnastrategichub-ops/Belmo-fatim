import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface StickyBottomCartProps {
  items: CartItem[];
  onOpenCart: () => void;
}

export const StickyBottomCart: React.FC<StickyBottomCartProps> = ({ items, onOpenCart }) => {
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  if (totalCount === 0) return null;

  return (
    <aside aria-label="شريط السلة العائم" className="fixed bottom-20 inset-x-4 z-40 max-w-md mx-auto pointer-events-auto animate-in slide-in-from-bottom duration-300">
      <div
        onClick={onOpenCart}
        className="bg-[#162A22]/95 backdrop-blur-md text-white rounded-full p-2.5 pl-4 pr-3 border border-white/20 shadow-xl flex items-center justify-between gap-3 cursor-pointer hover:bg-[#1F5E4B] transition-all group"
      >
        {/* Left items summary */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center relative">
            <ShoppingBag className="w-4 h-4 text-emerald-300" />
            <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 font-latin text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs sm:text-sm font-black font-latin block">
              {totalPrice.toFixed(0)} DH
            </span>
            <span className="text-[10px] text-emerald-200 block">
              {totalCount} {totalCount === 1 ? 'منتج فـ السلة' : 'منتجات فـ السلة'}
            </span>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-1 bg-white text-slate-900 font-black text-xs px-3.5 py-1.5 rounded-full shadow-2xs group-hover:bg-slate-100 transition-colors">
          <span>شوفي السلة</span>
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
        </div>
      </div>
    </aside>
  );
};
