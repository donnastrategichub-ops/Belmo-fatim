import { useState } from 'react';
import { Sparkles, ShoppingBag, Check, ShieldCheck, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface BuildRoutineByBudgetProps {
  onAddRoutine: (products: Product[]) => void;
}

export const BuildRoutineByBudget = ({ onAddRoutine }: BuildRoutineByBudgetProps) => {
  const [budgetValue, setBudgetValue] = useState<number>(350);

  // Derive active steps from budget
  let activeTier = 'starter';
  let tierName = 'روتين البداية (2 خطوات)';
  let desc = 'غسول لتنظيف المسام + واقي شمس مغذي بالأرز';
  let products = [
    PRODUCTS.find((p) => p.id === 'anua-cleansing-foam') || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'boj-relief-sun-rice') || PRODUCTS[3],
  ];
  let totalOriginal = 370;
  let totalCurrent = 308;
  let filledDots = 2;

  if (budgetValue < 250) {
    activeTier = 'basic';
    tierName = 'نضارة أساسية (خطوة واحدة)';
    desc = 'غسول كوري منظف ولطيف كيحافظ على توازن البشرة اليومي';
    products = [PRODUCTS.find((p) => p.id === 'anua-cleansing-foam') || PRODUCTS[0]];
    totalOriginal = 160;
    totalCurrent = 129;
    filledDots = 1;
  } else if (budgetValue >= 450) {
    activeTier = 'complete';
    tierName = 'Glass Skin كامل (4 خطوات)';
    desc = 'تنظيف + سيروم جينسنغ علاجي + ترطيب 77% + واقي شمس بالأرز';
    products = PRODUCTS.filter((p) => p.isFatimaPick);
    totalOriginal = 756;
    totalCurrent = 549;
    filledDots = 4;
  }

  const savings = totalOriginal - totalCurrent;

  return (
    <section className="px-4 py-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[28px] border border-emerald-950/5 shadow-[0_4px_25px_rgba(31,94,75,0.03)] p-5 sm:p-7">
        
        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 bg-[#EAF5EF] text-[#1F5E4B] px-3.5 py-1 rounded-full text-[11px] font-bold shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تحكمي فـ ميزانيتك</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            شحال بغيتي تصرفي؟ 💰
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            سحبي الميزانية وغادي تجمعي روتين كوري أصلي على قد جيبك
          </p>
        </div>

        {/* Section 14: Interactive Budget Touch Slider */}
        <div className="max-w-md mx-auto mb-6 bg-[#F8FAF8] p-4 sm:p-5 rounded-2xl border border-emerald-950/5">
          <div className="flex items-center justify-between text-xs font-black text-slate-700 mb-2">
            <span className="font-latin text-[#1F5E4B] text-base font-black">150 DH</span>
            <div className="bg-[#162A22] text-white px-3.5 py-1 rounded-full text-xs font-black font-latin shadow-2xs flex items-center gap-1">
              <span>الميزانية المختارة:</span>
              <span className="text-amber-300">{budgetValue} DH</span>
            </div>
            <span className="font-latin text-[#1F5E4B] text-base font-black">500+ DH</span>
          </div>

          <input
            type="range"
            min="150"
            max="550"
            step="50"
            value={budgetValue}
            onChange={(e) => setBudgetValue(Number(e.target.value))}
            className="w-full h-2.5 bg-emerald-950/15 rounded-lg appearance-none cursor-pointer accent-[#1F5E4B]"
          />

          {/* Section 7: Step Dots Indicator (○ → ○ → ○ → ○ to ● → ● → ● → ●) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 pt-3 border-t border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-600">اكتمال الروتين:</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((stepNum) => {
                const isFilled = stepNum <= filledDots;
                return (
                  <div
                    key={stepNum}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[9.5px] font-bold transition-all duration-300 ${
                      isFilled
                        ? 'bg-[#1F5E4B] text-white shadow-2xs scale-110'
                        : 'border border-slate-300 bg-white text-slate-400'
                    }`}
                  >
                    {isFilled ? '●' : '○'}
                  </div>
                );
              })}
            </div>
            <span className="text-[11px] font-bold text-[#1F5E4B]">
              ({filledDots} من 4 خطوات)
            </span>
          </div>
        </div>

        {/* Resulting Combo Card */}
        <div className="bg-gradient-to-br from-[#F8FAF8] to-[#F1F6F3] rounded-2xl p-4 sm:p-5 border border-emerald-950/5 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 text-right">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-slate-900">
                  {tierName}
                </h3>
                {filledDots === 4 && (
                  <span className="bg-emerald-600 text-white text-[9.5px] font-black px-2 py-0.5 rounded-full">
                    روتينك واجد ✨
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {desc}
              </p>
            </div>
            {savings > 0 && (
              <span className="bg-amber-100 text-amber-900 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                وفري {savings} DH
              </span>
            )}
          </div>

          {/* Products in the combo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 my-3">
            {products.map((prod, idx) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl p-2.5 border border-slate-100 flex items-center gap-2.5 text-right shadow-2xs hover:shadow-xs transition-shadow"
              >
                <img
                  src={prod.image}
                  alt={prod.nameAr}
                  className="w-11 h-11 object-contain rounded-lg bg-[#F8FAF8] p-1 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[9.5px] font-bold text-[#1F5E4B] block">
                    الخطوة {idx + 1}
                  </span>
                  <h4 className="text-[11px] font-bold text-slate-900 truncate">
                    {prod.nameAr}
                  </h4>
                  <span className="text-[10px] font-latin font-bold text-slate-600">
                    {prod.price} DH
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing & 1-Tap Add */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-black font-latin text-[#1F5E4B]">
                  {totalCurrent} DH
                </span>
                {savings > 0 && (
                  <span className="text-xs text-slate-400 line-through font-latin">
                    {totalOriginal} DH
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500">
                الدفع عند الاستلام • فحص قبل الشحن
              </span>
            </div>

            <button
              onClick={() => onAddRoutine(products)}
              className="min-h-[44px] bg-[#162A22] hover:bg-[#1F5E4B] text-white font-black py-3 px-6 rounded-full text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span>
                {filledDots === 4 ? 'خدي الروتين كامل' : 'أضيفي هاد التشكيلة للسلة'} ({totalCurrent} DH)
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
