import { useState } from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Layers, LayoutGrid } from 'lucide-react';
import { FATIMA_ROUTINE_STEPS, PRODUCTS } from '../data/products';
import { RoutineStep, Product } from '../types';
import { FatimasRoutineSkeleton } from './Skeletons';
import { ProductStackCarousel } from './ProductStackCarousel';

interface FatimasRoutineProps {
  isLoading?: boolean;
  onAddRoutineBundle: () => void;
  onSelectStepProduct: (step: RoutineStep) => void;
  onAddToCart?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const FatimasRoutine = ({
  isLoading = false,
  onAddRoutineBundle,
  onSelectStepProduct,
  onAddToCart = () => {},
  onSelectProduct,
}: FatimasRoutineProps) => {
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');

  return (
    <section id="routine-section" className="px-4 py-4">
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Section Title Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#EAF5EF] text-[#1F5E4B] px-3.5 py-1 rounded-full text-[11px] font-bold shadow-2xs mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>الباقة الأكثر طلباً</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              روتين فاطمة اليومي — 4 خطوات زجاجية ✨
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg">
              روتين كوري متكامل ومجرب كيعطي نضارة وترطيب عميق بدون تعقيد
            </p>
          </div>

          {/* View Mode Toggle: Stack vs Grid */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200/80 self-center sm:self-auto">
            <button
              onClick={() => setViewMode('stack')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'stack'
                  ? 'bg-white text-[#1F5E4B] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>بطاقات متراكمة (سحب)</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#1F5E4B] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>عرض الخطوات (4)</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <FatimasRoutineSkeleton />
        ) : viewMode === 'stack' ? (
          /* Signature Stacked Product Carousel Interaction (Section 2) */
          <div className="pt-2">
            <ProductStackCarousel
              onAddRoutineBundle={onAddRoutineBundle}
              onAddToCart={onAddToCart}
              onSelectProduct={(p) => {
                if (onSelectProduct) onSelectProduct(p);
                else {
                  const step = FATIMA_ROUTINE_STEPS.find(s => s.productNameAr === p.nameAr) || FATIMA_ROUTINE_STEPS[0];
                  onSelectStepProduct(step);
                }
              }}
            />
          </div>
        ) : (
          /* 4 Connected Visual Steps Grid */
          <div className="space-y-4 pt-2 animate-in fade-in-50">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {FATIMA_ROUTINE_STEPS.map((step) => (
                <div
                  key={step.stepNumber}
                  onClick={() => onSelectStepProduct(step)}
                  className="bg-white rounded-[22px] p-3.5 border border-emerald-950/5 shadow-[0_4px_20px_rgba(31,94,75,0.03)] text-center cursor-pointer hover:border-[#1F5E4B] transition-all group relative flex flex-col justify-between"
                >
                  <div>
                    {/* Step badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-[#1F5E4B] bg-[#EAF5EF] px-2 py-0.5 rounded-full font-latin">
                        خطوة {step.stepNumber}
                      </span>
                      <span className="text-[10.5px] font-bold text-slate-700">
                        {step.stepNameAr}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto my-1 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <img
                        src={step.image}
                        alt={step.productNameAr}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 text-right">
                    <h3 className="text-[11px] font-bold text-slate-900 truncate">
                      {step.productNameAr}
                    </h3>
                    <p className="text-[9.5px] text-slate-500 truncate mt-0.5 font-latin">
                      {step.brand}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle Offer Banner */}
            <div className="bg-gradient-to-br from-[#162A22] to-[#1F5E4B] text-white rounded-[28px] p-5 sm:p-7 shadow-[0_8px_30px_rgba(31,94,75,0.12)] relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-right">
                <div className="space-y-2.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-slate-900 text-[10.5px] font-black px-3 py-1 rounded-full shadow-2xs">
                      وفري 207 DH
                    </span>
                    <span className="text-emerald-200 text-xs font-bold">
                      باقة الروتين الكامل
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    الروتين كامل: 4 خطوات لبشرة مثالية
                  </h3>

                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-2xl sm:text-3xl font-black font-latin text-white">
                      549 DH
                    </span>
                    <span className="text-sm text-emerald-200/70 line-through font-latin">
                      756 DH
                    </span>
                    <span className="text-[11px] text-emerald-200 font-bold bg-white/10 px-2.5 py-0.5 rounded-full">
                      توصيل فابور
                    </span>
                  </div>

                  <p className="text-xs text-emerald-100/90 font-medium">
                    4 منتجات أصلية • روتين كامل متناسق • توصيل سريع • الدفع عند الاستلام
                  </p>
                </div>

                <div className="w-full md:w-auto shrink-0">
                  <button
                    onClick={onAddRoutineBundle}
                    className="w-full md:w-auto min-h-[44px] bg-white hover:bg-slate-50 text-slate-900 font-black py-4 px-8 rounded-full text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#1F5E4B]" />
                    <span>بغيت الروتين كامل — 549 DH</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
