import { useState } from 'react';
import { Sparkles, Sun, Droplets, ShieldCheck, Heart, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { SKIN_CONCERNS, PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SkinConcernProductsSkeleton } from './Skeletons';

interface SkinConcernSectionProps {
  isLoading?: boolean;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onConsultAI: () => void;
}

export const SkinConcernSection = ({
  isLoading = false,
  onSelectProduct,
  onAddToCart,
  onConsultAI,
}: SkinConcernSectionProps) => {
  const [selectedConcernId, setSelectedConcernId] = useState<string>('acne');

  const getConcernIcon = (id: string) => {
    switch (id) {
      case 'acne':
        return Sparkles;
      case 'dark-spots':
        return Sun;
      case 'dryness':
        return Droplets;
      case 'sensitive':
        return ShieldCheck;
      case 'glow':
        return Heart;
      default:
        return Sparkles;
    }
  };

  const getConcernSolution = (id: string) => {
    switch (id) {
      case 'acne':
        return 'بشرتك كتحتاج: تنظيف لطيف للمسام + تهدئة الالتهاب + سيروم مجدد';
      case 'dark-spots':
        return 'بشرتك كتحتاج: توحيد لون البشرة بخلاصة الأرز + سيروم النياسيناميد + حماية شمسية 50+';
      case 'dryness':
        return 'بشرتك كتحتاج: ترطيب عميق بحمض الهيالورونيك + حاجز حماية بالهوتوينيا 77%';
      case 'sensitive':
        return 'بشرتك كتحتاج: تهدئة الاحمرار بخلاصة السيكا + تركيبة نباتية خالية من العطور';
      case 'glow':
        return 'بشرتك كتحتاج: تقشير لطيف يومي + خلاصة الحلزون وسيروم الجينسنغ للـ Glass Skin';
      default:
        return 'روتين مخصص يوازن ويغذي بشرتك';
    }
  };

  const currentConcern = SKIN_CONCERNS.find((c) => c.id === selectedConcernId) || SKIN_CONCERNS[0];
  const recommendedProducts = PRODUCTS.filter((p) =>
    currentConcern.recommendedProductIds.includes(p.id)
  );

  return (
    <section id="concerns-section" className="px-3 sm:px-4 py-4 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-[22px] sm:rounded-[28px] border border-emerald-950/5 shadow-[0_4px_25px_rgba(31,94,75,0.03)] p-3.5 sm:p-6">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 bg-[#EAF5EF] text-[#1F5E4B] px-3.5 py-1 rounded-full text-[11px] font-bold shadow-2xs mb-2">
            <span>شنو محتاجة بشرتك؟</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            شنو بغيتي تصلحي فبشرتك؟
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
            سحبي واختاري المشكل اللي كتعاني منّو وغادي تشوفي الحل الكوري المناسب فالحين
          </p>
        </div>

        {/* 5 Large Swipeable Problem Cards with Peek (Section 5) */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 snap-slider mb-4">
          {SKIN_CONCERNS.map((concern) => {
            const isSelected = selectedConcernId === concern.id;
            const Icon = getConcernIcon(concern.id);

            return (
              <button
                key={concern.id}
                type="button"
                onClick={() => setSelectedConcernId(concern.id)}
                className={`snap-card p-3.5 rounded-2xl border text-right transition-all cursor-pointer min-w-[200px] sm:min-w-[220px] flex-1 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#1F5E4B] bg-[#F4FAF6] shadow-sm ring-2 ring-[#1F5E4B]/10'
                    : 'border-slate-100 bg-[#F9FAF9] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#1F5E4B] text-white' : 'bg-white text-slate-500 shadow-2xs'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {isSelected && (
                    <span className="bg-[#1F5E4B] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      محدد ✓
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className={`text-xs sm:text-sm font-black truncate ${isSelected ? 'text-[#1F5E4B]' : 'text-slate-900'}`}>
                    {concern.titleAr}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight line-clamp-1 mt-0.5">
                    {concern.subtitleAr}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded Transformation Card (Section 5) */}
        <div className="bg-gradient-to-br from-[#F4FAF6] via-[#EAF5EF] to-white rounded-2xl p-4 sm:p-5 border border-emerald-950/5 mb-4 text-right animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-[#1F5E4B]">
              تشخيص فوري لـ: {currentConcern.titleAr}
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full shadow-2xs">
              روتين موجه
            </span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-900 mb-3 leading-relaxed">
            ✨ {getConcernSolution(currentConcern.id)}
          </p>

          {/* Curated Products horizontal slider with peek (Section 4) */}
          <div className="pt-2 border-t border-emerald-950/5">
            <span className="text-xs font-black text-slate-900 block mb-2.5">
              شوفي المنتجات المناسبة لـ {currentConcern.titleAr}:
            </span>

            {isLoading ? (
              <SkinConcernProductsSkeleton />
            ) : (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-slider">
                {recommendedProducts.map((prod) => (
                  <div key={prod.id} className="snap-card w-[180px] sm:w-[210px]">
                    <ProductCard
                      product={prod}
                      onSelectProduct={onSelectProduct}
                      onAddToCart={onAddToCart}
                      variant="compact"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Belmo AI Fast Assistant Prompt */}
        <div className="pt-2 text-center">
          <button
            onClick={onConsultAI}
            className="w-full sm:w-auto bg-[#162A22] hover:bg-[#1F5E4B] text-white font-bold py-3 px-6 rounded-full inline-flex items-center justify-center gap-2 transition-all shadow-xs active:scale-98 text-xs sm:text-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>خلي Belmo يفهم بشرتك — تشخيص مجاني فـ أقل من 2 دقايق</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
