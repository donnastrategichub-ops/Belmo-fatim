import React from 'react';
import { Sparkles, ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import { CuratedRoutine } from '../types';
import { CURATED_ROUTINES } from '../data/products';

interface KoreanSkinRoutinesSectionProps {
  onAddRoutine: (routine: CuratedRoutine) => void;
  onSelectRoutine?: (routine: CuratedRoutine) => void;
}

export const KoreanSkinRoutinesSection: React.FC<KoreanSkinRoutinesSectionProps> = ({
  onAddRoutine,
}) => {
  const routines = CURATED_ROUTINES;

  return (
    <section id="korean-skin-routines" className="px-3 sm:px-4 py-8 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-5">
        
        {/* Section Header */}
        <div className="text-right space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5E4B] bg-[#F0F7F4] px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED PROTOCOLS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            روتينات العناية الكورية المتكاملة 🌿
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
            بروتوكولات علاجية متناسقة بخطوات مرقمة لتحقيق أقصى فاعلية وتوفير أكبر في السعر.
          </p>
        </div>

        {/* 3 Curated Routine Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {routines.map((routine) => (
            <div
              key={routine.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header: Badge & Savings */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <span className="text-xs font-bold text-[#1F5E4B] bg-[#F0F7F4] px-2.5 py-0.5 rounded-full">
                    {routine.badgeAr}
                  </span>
                  <span className="text-[11px] font-bold text-[#FF4D6D] bg-[#FFF0F3] px-2 py-0.5 rounded-full font-latin">
                    توفير {routine.savings} DH
                  </span>
                </div>

                {/* Routine Title & Benefit */}
                <div className="text-right space-y-1">
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#1F5E4B] transition-colors">
                    {routine.nameAr}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {routine.targetSkinAr}
                  </p>
                </div>

                {/* Steps Visual List */}
                <div className="space-y-2 py-2 border-y border-slate-100">
                  {routine.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2.5 text-right">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 p-1 shrink-0 overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.productNameAr}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-latin text-[10px] font-bold text-slate-400">
                            0{step.number}
                          </span>
                          <span className="text-xs font-bold text-slate-800 truncate block">
                            {step.stepTypeAr}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 truncate block">
                          {step.productNameAr}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-emerald-800 bg-[#F0F7F4] p-2 rounded-xl flex items-start gap-1.5 text-right">
                  <Check className="w-3.5 h-3.5 text-[#1F5E4B] shrink-0 mt-0.5" />
                  <span>{routine.clinicalNoteAr}</span>
                </div>
              </div>

              {/* Price & Add Full Routine CTA */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-1.5 font-latin text-right">
                  <span className="text-base sm:text-lg font-black text-[#1F5E4B]">
                    {routine.price} DH
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {routine.originalPrice} DH
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onAddRoutine(routine)}
                  className="min-h-[38px] px-4 bg-slate-900 hover:bg-[#1F5E4B] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                  <span>اكتشفي الروتين</span>
                  <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
