import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Heart, X, Check, ArrowLeft, RefreshCw, Star } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SwipeToDiscoverProps {
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const SwipeToDiscover: React.FC<SwipeToDiscoverProps> = ({
  onAddToCart,
  onSelectProduct,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);

  const discoveryProducts = PRODUCTS.slice(0, 6);
  const currentProduct = discoveryProducts[currentIndex % discoveryProducts.length];

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setTouchDelta(0);
    setIsLiked(false);
  };

  const handleAddAndNext = () => {
    onAddToCart(currentProduct);
    setIsLiked(true);
    setTimeout(() => {
      handleNext();
    }, 600);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setTouchDelta(e.targetTouches[0].clientX - touchStart);
  };

  const handleTouchEnd = () => {
    if (touchDelta > 70) {
      // Swiped Right -> Add to cart
      handleAddAndNext();
    } else if (touchDelta < -70) {
      // Swiped Left -> Skip to next
      handleNext();
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  return (
    <section className="px-4 py-4">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-white to-[#F4FAF6] rounded-[28px] border border-emerald-950/5 shadow-[0_4px_25px_rgba(31,94,75,0.03)] p-5 sm:p-7">
        
        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 bg-[#EAF5EF] text-[#1F5E4B] px-3.5 py-1 rounded-full text-[11px] font-bold shadow-2xs mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>اكتشاف سريع وممتع</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            سحبي واكتاشفي ✨
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
            سحبي لليمين باش تضيفيه للسلة، أو لليسار باش تشوفي منتج آخر
          </p>
        </div>

        {/* Swipe Card Stage */}
        <div className="relative max-w-xs mx-auto h-[400px] flex items-center justify-center select-none touch-pan-y">
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => onSelectProduct(currentProduct)}
            style={{
              transform: `translateX(${touchDelta}px) rotate(${touchDelta * 0.04}deg)`,
              transition: touchStart === null ? 'transform 0.3s ease' : 'none',
            }}
            className="w-full h-full bg-white rounded-[32px] p-4 border border-emerald-950/10 shadow-[0_12px_36px_rgba(31,94,75,0.08)] flex flex-col justify-between cursor-pointer relative overflow-hidden"
          >
            {/* Visual Indicator of swipe decision */}
            {touchDelta > 30 && (
              <div className="absolute top-4 right-4 bg-emerald-600 text-white font-black text-xs px-3 py-1.5 rounded-full z-30 shadow-md">
                أضيفي للسلة ✓
              </div>
            )}
            {touchDelta < -30 && (
              <div className="absolute top-4 left-4 bg-slate-800 text-white font-black text-xs px-3 py-1.5 rounded-full z-30 shadow-md">
                التالي ✕
              </div>
            )}

            {/* Product Image Stage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-[#1F5E4B] uppercase tracking-wider font-latin">
                  {currentProduct.brand}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs font-latin">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{currentProduct.rating}</span>
                </div>
              </div>

              <div className="w-full h-44 bg-[#F4FAF6] rounded-2xl p-3 flex items-center justify-center relative overflow-hidden mb-3">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.nameAr}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-right space-y-1">
                <h3 className="text-sm font-black text-slate-900 line-clamp-1">
                  {currentProduct.nameAr}
                </h3>
                {currentProduct.benefitAr && (
                  <p className="text-[11px] text-[#1F5E4B] font-bold line-clamp-1">
                    ✨ {currentProduct.benefitAr}
                  </p>
                )}
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="text-right">
                <span className="text-base font-black font-latin text-[#1F5E4B]">
                  {currentProduct.price.toFixed(0)} DH
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="تخطي"
                  className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddAndNext();
                  }}
                  aria-label="أضيفي للسلة"
                  className="bg-[#162A22] hover:bg-[#1F5E4B] text-white text-xs font-black min-h-[44px] px-4 rounded-full flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
                  <span>عجبك؟ أضيفيه</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
