import { useState, useRef } from 'react';
import { ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { CURATED_ROUTINES } from '../data/products';
import { CuratedRoutine, Product } from '../types';

interface RoutinesSectionProps {
  onAddRoutine: (routine: CuratedRoutine) => void;
  onSelectProduct?: (product: Product) => void;
}

export const RoutinesSection = ({ onAddRoutine }: RoutinesSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToRoutine = (index: number) => {
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
    <section id="routines-section" className="px-3 sm:px-4 py-8 sm:py-12 bg-[#FBFDFB] border-y border-slate-100 scroll-mt-14 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#1F5E4B] border border-emerald-200/60 px-3.5 py-1 rounded-full text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>روتينات علاجية كورية متسلسلة 🧴</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            روتينات متكاملة حسب احتياج بشرتك
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            خطوات علاجية متسلسلة بنتائج ملحوظة وسريعة مع خصم خاص على كل روتين كامل
          </p>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
          {CURATED_ROUTINES.map((routine, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={routine.id}
                type="button"
                onClick={() => scrollToRoutine(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F5E4B] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{routine.nameAr}</span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Card Container */}
        <div className="w-full max-w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 scrollbar-none w-full"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {CURATED_ROUTINES.map((routine) => {
              return (
                <div
                  key={routine.id}
                  id={`routine-card-${routine.id}`}
                  className="w-[88vw] sm:w-[360px] md:w-[390px] shrink-0 snap-start bg-white rounded-[24px] border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-5 flex flex-col justify-between space-y-4 text-right"
                >
                  {/* Top Info */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="bg-emerald-50 text-[#1F5E4B] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {routine.badgeAr}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        وفري {routine.savings} DH
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 leading-snug">
                      {routine.nameAr}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {routine.clinicalNoteAr}
                    </p>
                  </div>

                  {/* Numbered Steps */}
                  <div className="space-y-2 bg-slate-50 rounded-2xl p-3 border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      التسلسل العلاجي (Sequence):
                    </span>
                    {routine.steps.map((step) => (
                      <div
                        key={step.number}
                        className="flex items-center gap-2.5 bg-white p-2 rounded-xl border border-slate-100"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#1F5E4B] text-white flex items-center justify-center font-latin font-bold text-[11px] shrink-0">
                          {step.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {step.productNameAr}
                          </p>
                          <p className="text-[10px] text-slate-400 font-latin truncate">
                            {step.brand} • {step.stepTypeAr}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price & Buy Button */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-baseline justify-between font-latin">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">
                          {routine.price} DH
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {routine.originalPrice} DH
                        </span>
                      </div>
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>طقم علاجي كامل</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onAddRoutine(routine)}
                      className="w-full min-h-[44px] bg-[#1F5E4B] hover:bg-[#164436] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>اطلبي الروتين كاملاً (وفري {routine.savings} DH)</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
