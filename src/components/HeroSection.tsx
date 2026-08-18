import { Sparkles, ArrowLeft, ShieldCheck, Truck, Banknote, Heart } from 'lucide-react';

interface HeroSectionProps {
  onStartDiagnosis: () => void;
  onExploreFatima: () => void;
}

export const HeroSection = ({ onStartDiagnosis, onExploreFatima }: HeroSectionProps) => {
  return (
    <section className="px-4 pt-3 pb-3">
      <div className="max-w-5xl mx-auto">
        {/* Story-native Hero Card */}
        <div className="relative w-full rounded-[28px] overflow-hidden bg-gradient-to-b from-[#E9F3EE] via-[#E2ECE5] to-[#D9E6DC] border border-white shadow-[0_8px_30px_rgba(31,94,75,0.06)] p-5 sm:p-7 flex flex-col justify-between min-h-[390px] sm:min-h-[420px]">
          
          {/* Real Moroccan Model Glass Skin Portrait */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/belmo_hero_model_1787069738435.jpg"
              alt="Moroccan Glowing Skin - Belmo K-Beauty"
              className="w-full h-full object-cover object-[center_20%] opacity-90 sm:opacity-95"
              referrerPolicy="no-referrer"
            />
            {/* Soft vertical gradient overlay for maximum text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#EDF3EE] via-[#EDF3EE]/75 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#EDF3EE]/80 via-[#EDF3EE]/40 to-transparent" />
          </div>

          {/* Top Story-style Pills */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-emerald-950/5 px-3 py-1 rounded-full shadow-2xs text-[11px] font-bold text-[#1F5E4B]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Belmo • روتينك الكوري الساهل</span>
            </div>

            <div className="bg-[#162A22]/90 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full shadow-2xs flex items-center gap-1.5 text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>اختيارات فاطمة الزهراء</span>
            </div>
          </div>

          {/* Main Result-Focused Copy & Direct CTAs */}
          <div className="relative z-10 mt-auto pt-16 space-y-3.5">
            {/* Main Headline */}
            <div className="space-y-2 text-right">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.25] tracking-tight">
                بغيتي بشرة نضرة بلا ما تحتاري شنو تشري؟ ✨
              </h1>
              <p className="text-xs sm:text-sm text-slate-800 max-w-md font-bold leading-relaxed">
                جاوبي على شوية ديال الأسئلة، وBelmo غادي يقترح عليك الروتين المناسب لبشرتك.
              </p>
            </div>

            {/* CTAs Group */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Primary CTA */}
              <button
                onClick={onStartDiagnosis}
                className="bg-[#162A22] hover:bg-[#1F5E4B] text-white font-black py-3.5 px-6 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-300 group-hover:rotate-12 transition-transform" />
                <span>عرفي شنو مناسب لبشرتك</span>
                <ArrowLeft className="w-4 h-4 rtl:rotate-0 -mr-0.5" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onExploreFatima}
                className="bg-white/95 hover:bg-white text-slate-800 font-bold py-3.5 px-5 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs border border-white/80 active:scale-98 transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-[#FF6B81] fill-[#FF6B81]" />
                <span>شوفي اختيارات فاطمة</span>
              </button>
            </div>
          </div>
        </div>

        {/* Compact Trust Chips Immediately Underneath */}
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/90 rounded-2xl p-2.5 border border-emerald-950/5 shadow-2xs flex flex-col sm:flex-row items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1F5E4B] shrink-0" />
            <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 whitespace-nowrap">
              كوري أصلي 100%
            </span>
          </div>

          <div className="bg-white/90 rounded-2xl p-2.5 border border-emerald-950/5 shadow-2xs flex flex-col sm:flex-row items-center justify-center gap-1.5">
            <Banknote className="w-4 h-4 text-[#1F5E4B] shrink-0" />
            <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 whitespace-nowrap">
              الدفع عند الاستلام
            </span>
          </div>

          <div className="bg-white/90 rounded-2xl p-2.5 border border-emerald-950/5 shadow-2xs flex flex-col sm:flex-row items-center justify-center gap-1.5">
            <Truck className="w-4 h-4 text-[#1F5E4B] shrink-0" />
            <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 whitespace-nowrap">
              توصيل لجميع المدن
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
