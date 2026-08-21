import { useState, useRef } from 'react';
import { Gift, ShoppingBag, Sparkles, Check, Truck } from 'lucide-react';
import { GIFT_BUNDLES } from '../data/products';
import { GiftBundle } from '../types';

interface GiftBundlesSectionProps {
  onAddGiftBundle: (bundle: GiftBundle) => void;
}

export const GiftBundlesSection = ({ onAddGiftBundle }: GiftBundlesSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      container.scrollTo({
        left: card.offsetLeft,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  return (
    <section id="gift-bundles-section" className="px-3 sm:px-4 py-8 my-8 scroll-mt-14 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Section Header with generous space */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 text-[#FF4D6D] border border-rose-200/60 px-3.5 py-1 rounded-full text-xs font-bold shadow-xs">
            <Gift className="w-3.5 h-3.5 text-[#FF4D6D]" />
            <span>بوكسات وتشكيلات الهدايا الحصرية 🎁</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            تشكيلات روز بيري والكورية الفاخرة
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            هدايا فاخرة مجهزة بتغليف حريري فاخر وشريط ساتان مع بطاقة إهداء مخصصة مجانية
          </p>
        </div>

        {/* Horizontal Swipe Row with Smooth Scroll */}
        <div className="w-full max-w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 scrollbar-none w-full"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {GIFT_BUNDLES.map((bundle, index) => {
              const isFeatured = index === 0;

              return (
                <div
                  key={bundle.id}
                  id={`gift-card-${bundle.id}`}
                  className={`w-[85vw] sm:w-[350px] md:w-[370px] shrink-0 snap-start rounded-[24px] bg-white border ${
                    isFeatured
                      ? 'border-rose-200 shadow-[0_8px_30px_rgba(255,77,109,0.08)] ring-1 ring-rose-200'
                      : 'border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                  } p-4 sm:p-5 flex flex-col justify-between transition-all`}
                >
                  {/* Top Ribbon & Savings */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-white px-3 py-0.5 rounded-full shadow-2xs"
                      style={{ backgroundColor: bundle.ribbonColor }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{bundle.badgeAr}</span>
                    </span>

                    <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <span>وفري {bundle.savings} DH</span>
                    </div>
                  </div>

                  {/* Bundle Visual & Info */}
                  <div className="space-y-3">
                    <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-2">
                      <img
                        src={bundle.image}
                        alt={bundle.nameAr}
                        className="w-full h-full object-cover rounded-xl"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      <h3 className="text-base font-black text-slate-900 leading-snug">
                        {bundle.nameAr}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                        {bundle.taglineAr}
                      </p>
                    </div>

                    {/* Products Included list */}
                    <div className="bg-slate-50 rounded-xl p-2.5 space-y-1.5 border border-slate-100/80">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                        محتويات البوكس:
                      </span>
                      {bundle.productsIncluded.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-medium text-slate-700">
                          <span className="truncate max-w-[200px]">{item.nameAr}</span>
                          <span className="text-[10px] font-latin font-bold text-[#1F5E4B] bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                            {item.brand}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Perks */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      {bundle.perksAr.slice(0, 2).map((perk, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[10.5px] text-slate-600 font-medium">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-4 border-t border-slate-100 mt-4 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5 font-latin">
                        <span className="text-xl sm:text-2xl font-black text-slate-900">
                          {bundle.price} DH
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {bundle.originalPrice} DH
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" />
                        <span>توصيل مجاني</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onAddGiftBundle(bundle)}
                      className="w-full min-h-[44px] bg-slate-900 hover:bg-[#1F5E4B] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>اطلبي هذا البوكس الآن</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {GIFT_BUNDLES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? 'w-6 bg-slate-900' : 'w-1.5 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
