import React from 'react';
import { ArrowDown, Sparkles, Leaf } from 'lucide-react';

interface TransitionToKoreanSkinBannerProps {
  onScrollToKoreanSkin?: () => void;
}

export const TransitionToKoreanSkinBanner: React.FC<TransitionToKoreanSkinBannerProps> = ({
  onScrollToKoreanSkin,
}) => {
  return (
    <section className="px-3 sm:px-4 py-8 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative rounded-2xl md:rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#F0F7F4] via-[#E6F3ED] to-[#FAF9F6] border border-emerald-100 shadow-2xs overflow-hidden text-right select-none">
          
          {/* Subtle Graphic Accents */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#1F5E4B]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
            
            {/* Left/Main Column: Text Narrative */}
            <div className="space-y-2 max-w-lg">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5E4B] bg-white px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
                <Leaf className="w-3.5 h-3.5" />
                <span className="font-latin tracking-wide">MAKEUP → SKINCARE</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                بعد إطلالة Rose Berry… <span className="text-[#1F5E4B]">حان وقت العناية ✨</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                أساس المكياج المثالي يبدأ من بشرة صحية ورطبة ومحمية. استكشفي أقوى منتجات العناية الكورية الأصلية من سيول مباشرة.
              </p>
            </div>

            {/* Right Column: CTA */}
            <div className="shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={onScrollToKoreanSkin}
                className="w-full sm:w-auto min-h-[44px] px-6 bg-[#1F5E4B] hover:bg-[#164336] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>اكتشفي عالم Korean Skin</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
