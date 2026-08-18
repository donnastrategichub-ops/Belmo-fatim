import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { RoutineStep, Product } from '../types';
import { FATIMA_ROUTINE_STEPS, PRODUCTS } from '../data/products';

interface ProductStackCarouselProps {
  onAddRoutineBundle: () => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductStackCarousel: React.FC<ProductStackCarouselProps> = ({
  onAddRoutineBundle,
  onAddToCart,
  onSelectProduct,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState<number>(0);
  const [isAddedSingle, setIsAddedSingle] = useState(false);

  const steps = FATIMA_ROUTINE_STEPS;
  const totalSteps = steps.length;
  const currentStep = steps[activeIndex];
  const currentProduct = PRODUCTS.find((p) => p.nameAr.includes(currentStep.brand) || p.brand === currentStep.brand) || PRODUCTS[activeIndex] || PRODUCTS[0];

  const handleNext = () => {
    if (activeIndex < totalSteps - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      setActiveIndex(0);
    }
    setTouchDelta(0);
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else {
      setActiveIndex(totalSteps - 1);
    }
    setTouchDelta(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - touchStart;
    setTouchDelta(diff);
  };

  const handleTouchEnd = () => {
    if (touchStart === null) return;
    // In RTL or LTR swipe thresholds
    if (touchDelta > 50) {
      handlePrev();
    } else if (touchDelta < -50) {
      handleNext();
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  const handleAddSingle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(currentProduct);
    setIsAddedSingle(true);
    setTimeout(() => setIsAddedSingle(false), 1400);
  };

  return (
    <div className="w-full relative">
      {/* Top Controls: Step Indicator & Swipe Hint */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#162A22] text-white text-xs font-black font-latin px-3 py-1 rounded-full shadow-2xs">
            {activeIndex + 1} / {totalSteps}
          </span>
          <span className="text-xs font-bold text-[#1F5E4B] bg-[#EAF5EF] px-2.5 py-1 rounded-full">
            الخطوة {currentStep.stepNumber}: {currentStep.stepNameAr}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold animate-pulse">
          <span>سحبي باش تشوفي الخطوة الجاية</span>
          <span className="text-sm">👈</span>
        </div>
      </div>

      {/* Stacked Cards Area */}
      <div
        className="relative h-[430px] sm:h-[460px] w-full max-w-sm mx-auto flex items-center justify-center select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {steps.map((step, idx) => {
          // Calculate offset relative to activeIndex
          const offset = (idx - activeIndex + totalSteps) % totalSteps;
          const isCurrent = offset === 0;
          const isNext = offset === 1;
          const isBehind = offset > 2;

          if (isBehind) return null;

          const matchedProd = PRODUCTS.find((p) => p.nameAr.includes(step.brand) || p.brand === step.brand) || PRODUCTS[idx] || PRODUCTS[0];

          // Dynamic scale and translation based on stack depth and live touch drag
          let translateY = offset * 14;
          let scale = 1 - offset * 0.05;
          let zIndex = 30 - offset * 10;
          let opacity = offset === 0 ? 1 : offset === 1 ? 0.85 : 0.6;
          let translateX = isCurrent ? touchDelta : 0;
          let rotate = isCurrent ? touchDelta * 0.03 : 0;

          return (
            <div
              key={step.stepNumber}
              onClick={() => {
                if (isCurrent) {
                  onSelectProduct(matchedProd);
                } else {
                  setActiveIndex(idx);
                }
              }}
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                zIndex,
                opacity,
                transition: touchStart === null ? 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease' : 'none',
              }}
              className={`absolute top-0 inset-x-0 bg-white rounded-[32px] p-5 border border-emerald-950/10 shadow-[0_12px_36px_rgba(31,94,75,0.08)] flex flex-col justify-between cursor-pointer transition-shadow ${
                isCurrent ? 'hover:shadow-xl' : 'pointer-events-auto'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black text-[#1F5E4B] bg-[#EAF5EF] px-3 py-1 rounded-full">
                    {step.stepNameAr}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 font-latin uppercase tracking-wider">
                    {step.brand}
                  </span>
                </div>

                {/* Product Image Stage */}
                <div className="w-full h-44 bg-gradient-to-b from-[#F4FAF6] to-[#EAF5EF] rounded-2xl p-3 flex items-center justify-center relative overflow-hidden mb-3">
                  <img
                    src={step.image}
                    alt={step.productNameAr}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] font-bold text-slate-700 shadow-2xs">
                    خطوة {step.stepNumber}
                  </div>
                </div>

                {/* Product Titles & Role */}
                <div className="text-right space-y-1">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 line-clamp-1">
                    {step.productNameAr}
                  </h3>
                  <p className="text-xs text-[#1F5E4B] font-bold line-clamp-1">
                    ✨ المكون الفعال: {step.keyIngredient}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {step.stepNameEn} • {step.productNameEn}
                  </p>
                </div>
              </div>

              {/* Price & Single Add */}
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-right">
                  <span className="text-base font-black font-latin text-[#1F5E4B]">
                    {step.price} DH
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    الدفع عند الاستلام
                  </span>
                </div>

                <button
                  onClick={handleAddSingle}
                  aria-label="أضيفي هاد المنتج بوحدو"
                  className={`min-h-[44px] px-4 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                    isAddedSingle
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#162A22] hover:bg-[#1F5E4B] text-white shadow-2xs'
                  }`}
                >
                  {isAddedSingle ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>تزاد للسلة!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>أضيفي هاد الخطوة</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Swipe Navigation Dots & Arrows */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          aria-label="الخطوة السابقة"
          className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-950 flex items-center justify-center shadow-2xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 rtl:rotate-0" />
        </button>

        <div className="flex items-center gap-2">
          {steps.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              aria-label={`الانتقال للخطوة ${dotIdx + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                activeIndex === dotIdx
                  ? 'w-7 bg-[#1F5E4B]'
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="الخطوة التالية"
          className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-950 flex items-center justify-center shadow-2xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 rtl:rotate-0" />
        </button>
      </div>

      {/* Bottom Sticky Bundle Offer */}
      <div className="mt-5 p-4 bg-gradient-to-r from-[#162A22] to-[#1F5E4B] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md text-right">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black">الروتين كامل بخصم حصري</span>
            <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full">
              وفري 207 DH
            </span>
          </div>
          <p className="text-[11px] text-emerald-200 mt-0.5">
            4 خطوات كورية متكاملة • توصيل مجاني لباب دارك
          </p>
        </div>

        <button
          onClick={onAddRoutineBundle}
          className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs min-h-[44px] px-6 rounded-full flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>خدي الروتين كامل (549 DH)</span>
        </button>
      </div>
    </div>
  );
};
