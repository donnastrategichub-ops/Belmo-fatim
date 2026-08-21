import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onDiscoverRoseBerry?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDiscoverRoseBerry,
}) => {
  return (
    <section className="px-3 sm:px-4 pt-2 pb-4 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#0F172A] min-h-[420px] sm:min-h-[460px] md:min-h-[500px] flex flex-col justify-end p-5 sm:p-8 md:p-10 shadow-md border border-slate-800 select-none">
          
          {/* Campaign Imagery: Fatima Ezzahra with Rose Berry Luxury Presentation */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/fatima_ambassador_story_1787069751769.jpg"
              alt="Rose Berry x Belmo x Fatima Ezzahra Campaign"
              className="w-full h-full object-cover object-top sm:object-center brightness-[0.92]"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            {/* Editorial Vignettes & Atmospheric Lighting */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B121E] via-[#0B121E]/65 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B121E]/85 via-[#0B121E]/30 to-transparent" />
          </div>

          {/* Campaign Narrative: Campaign -> Emotion -> Product -> CTA */}
          <div className="relative z-10 space-y-3 sm:space-y-4 text-right max-w-lg">
            
            {/* Campaign Eyebrow */}
            <div className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span className="font-latin tracking-wide text-[11px] uppercase font-bold text-white/90">
                ROSE BERRY × BELMO
              </span>
            </div>

            {/* Campaign Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
              بوكسات المكياج والهدايا <span className="text-[#FF4D6D]">الأكثر فخامة</span>
            </h1>

            {/* Emotion & Context */}
            <p className="text-xs sm:text-sm text-slate-200/90 font-medium leading-relaxed max-w-md">
              إطلالة مكياج متألقة مستوحاة من اختيارات فاطمة الزهراء، بتركيبات إماراتية فاخرة وتغليف هدايا ملكي مجاني.
            </p>

            {/* Single Dominant CTA */}
            <div className="pt-2">
              <button
                id="hero-primary-cta"
                type="button"
                onClick={onDiscoverRoseBerry}
                className="w-full sm:w-auto min-h-[46px] bg-[#FF4D6D] hover:bg-[#E03A58] active:scale-98 text-white font-bold py-3 px-7 rounded-xl text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>اكتشفي مجموعة Rose Berry</span>
                <ArrowLeft className="w-4 h-4 rtl:rotate-0" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

