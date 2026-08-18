import React from 'react';
import { X, Check, ShoppingBag, ArrowLeft, Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface InstantAddedSheetProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onViewCart: () => void;
  onAddComplementary: (complementaryProduct: Product) => void;
}

export const InstantAddedSheet: React.FC<InstantAddedSheetProps> = ({
  product,
  isOpen,
  onClose,
  onViewCart,
  onAddComplementary,
}) => {
  if (!isOpen || !product) return null;

  // Find a smart complementary product
  const getComplementaryProduct = (): Product => {
    if (product.category === 'serum' || product.category === 'toner') {
      return PRODUCTS.find((p) => p.category === 'sunscreen') || PRODUCTS[3];
    } else if (product.category === 'cleanser') {
      return PRODUCTS.find((p) => p.category === 'moisturizer') || PRODUCTS[2];
    } else if (product.category === 'sunscreen') {
      return PRODUCTS.find((p) => p.category === 'serum') || PRODUCTS[1];
    }
    return PRODUCTS.find((p) => p.id !== product.id) || PRODUCTS[0];
  };

  const complementary = getComplementaryProduct();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-end justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Bottom Sheet Box */}
      <div className="relative z-10 bg-white max-w-md w-full rounded-t-[32px] p-5 shadow-2xl border-t border-emerald-950/5 animate-in slide-in-from-bottom duration-300">
        
        {/* Top Close Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
            <div className="w-6 h-6 rounded-full bg-[#EAF5EF] flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3] text-[#1F5E4B]" />
            </div>
            <span>تمت الإضافة للسلة بنجاح ✨</span>
          </div>

          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Added Product Mini Row */}
        <div className="py-3 flex items-center justify-between gap-3 text-right">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#F4FAF6] p-1 shrink-0 border border-slate-100 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.nameAr}
                className="w-full h-full object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-slate-900 truncate">{product.nameAr}</h4>
              <span className="text-[11px] font-latin font-bold text-[#1F5E4B]">
                {product.price.toFixed(0)} DH
              </span>
            </div>
          </div>
        </div>

        {/* Smart Complementary Suggestion */}
        <div className="my-2 p-3.5 bg-gradient-to-br from-[#F4FAF6] to-[#EAF5EF] rounded-2xl border border-emerald-950/5 text-right">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black text-slate-900 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>بزاف البنات كياخدو معاه حتى:</span>
            </span>
            <span className="text-[9.5px] font-bold text-[#1F5E4B] bg-white px-2 py-0.5 rounded-full shadow-2xs">
              مكمل مثالي
            </span>
          </div>

          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={complementary.image}
                alt={complementary.nameAr}
                className="w-10 h-10 object-contain rounded-lg bg-white p-1 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <h5 className="text-[11px] font-bold text-slate-900 truncate">
                  {complementary.nameAr}
                </h5>
                <span className="text-[10px] font-latin font-bold text-[#1F5E4B]">
                  {complementary.price.toFixed(0)} DH
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onAddComplementary(complementary);
                onClose();
              }}
              className="bg-[#1F5E4B] hover:bg-[#162A22] text-white text-[11px] font-bold py-1.5 px-3 rounded-full flex items-center gap-1 shadow-2xs shrink-0 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>نعم، زيديه</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2.5">
          <button
            onClick={onClose}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-full text-xs transition-colors cursor-pointer text-center"
          >
            متابعة التسوق
          </button>

          <button
            onClick={() => {
              onClose();
              onViewCart();
            }}
            className="w-full bg-[#162A22] hover:bg-[#1F5E4B] text-white font-black py-3 px-4 rounded-full text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>شوفي السلة</span>
            <ArrowLeft className="w-3 h-3 rtl:rotate-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
