import { useState } from 'react';
import { ArrowDown, Sparkles, Gift, CheckCircle2, Crown } from 'lucide-react';

interface HeroSectionProps {
  onDiscoverGifts: () => void;
  onDiscoverRoseBerry: () => void;
}

export const HeroSection = ({ onDiscoverGifts, onDiscoverRoseBerry }: HeroSectionProps) => {
  const [activeVisual, setActiveVisual] = useState<number>(0);

  const visuals = [
    {
      image: '/src/assets/images/kbeauty_hero_gift_1787165413585.jpg',
      label: 'مكياج وبوكسات روز بيري 🇦🇪',
    },
    {
      image: '/src/assets/images/fatima_ambassador_story_1787069751769.jpg',
      label: 'روتين فاطمة الزهراء',
    },
    {
      image: '/src/assets/images/kbeauty_gift_box_1787069764163.jpg',
      label: 'تغليف الهدايا الفاخر',
    },
  ];

  return (
    <section className="px-3 sm:px-4 py-8 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-slate-950 border border-slate-100 shadow-[0_12px_40px_rgba(31,94,75,0.08)] min-h-[420px] sm:min-h-[480px] flex flex-col justify-between p-5 sm:p-10 select-none">
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={visuals[activeVisual].image}
              alt="Belmo x Rose Berry Collection"
              className="w-full h-full object-cover object-center transition-all duration-700"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            {/* Soft luxury gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/35 to-transparent" />
          </div>

          {/* Top Bar: Clean Badges & Visual Switcher */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full">
              <Crown className="w-3.5 h-3.5 text-rose-300" />
              <span className="text-[11px] sm:text-xs font-black tracking-wider text-white uppercase font-latin">
                ROSE BERRY ÉMIRATS × BELMO
              </span>
            </div>

            {/* Manual visual tabs */}
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10">
              {visuals.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVisual(idx)}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                    activeVisual === idx
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Headline & CTAs */}
          <div className="relative z-10 mt-auto pt-10 sm:pt-14 space-y-4 text-right max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-rose-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>تشكيلة مكياج وبوكسات روز بيري الإماراتية 🇦🇪</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
              أفخم بوكسات الهدايا والمكياج.<br />
              <span className="text-rose-200 font-extrabold">إطلالة ساحرة وتغليف كادو ملكي مجاني.</span>
            </h1>

            {/* Key Assurance Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-rose-200 font-bold">
              <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/15">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>أصلي 100% إماراتي وكوري</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/15">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>تغليف كادو مع شريط ساتان 🎁</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/15">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>الدفع عند الاستلام</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="hero-roseberry-cta"
                onClick={onDiscoverRoseBerry}
                className="w-full sm:w-auto min-h-[48px] bg-gradient-to-r from-[#FF5E7E] via-[#FF4D6D] to-[#E11D48] hover:brightness-110 active:scale-98 text-white font-black py-3 px-7 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(225,29,72,0.4)] transition-all cursor-pointer"
              >
                <Crown className="w-4 h-4 text-rose-100" />
                <span>اكتشفي تشكيلة روز بيري (6 منتجات)</span>
                <ArrowDown className="w-3.5 h-3.5 text-rose-100 mr-1" />
              </button>

              <button
                id="hero-gifts-cta"
                onClick={onDiscoverGifts}
                className="w-full sm:w-auto min-h-[48px] bg-white/15 hover:bg-white/25 active:scale-98 backdrop-blur-md text-white font-bold py-3 px-6 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
              >
                <Gift className="w-4 h-4 text-rose-200" />
                <span>بوكسات الهدايا والروتينات</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
