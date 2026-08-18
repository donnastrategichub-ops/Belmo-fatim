import { Sparkles, ArrowLeft, Bot, Check, ShieldCheck, Heart } from 'lucide-react';

interface BelmoAISectionProps {
  onOpenAI: () => void;
}

export const BelmoAISection = ({ onOpenAI }: BelmoAISectionProps) => {
  return (
    <section className="px-4 py-4">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#162A22] to-[#1F5E4B] text-white rounded-[28px] p-5 sm:p-7 shadow-[0_8px_30px_rgba(31,94,75,0.12)] relative overflow-hidden">
        
        {/* Background decorative soft ambient light */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF6B81]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 text-right">
          {/* Left Text Info */}
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-bold text-emerald-200">
              <Bot className="w-3.5 h-3.5" />
              <span>مساعد Belmo الذكي</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              خلي Belmo يعاونك 🌿
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              ماعارفاش شنو يناسب بشرتك؟ جاوبي على 3 أسئلة خفاف، وBelmo غادي يقترح عليك روتين كوري مخصص لمشكلتك وميزانيتك.
            </p>

            <div className="flex items-center gap-3 pt-1 text-[11px] text-emerald-200/80">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>مجاني 100%</span>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>أقل من دقيقتين</span>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>اقتراح روتين متكامل</span>
              </span>
            </div>
          </div>

          {/* Right Action Card */}
          <div className="w-full md:w-auto shrink-0">
            <button
              onClick={onOpenAI}
              className="w-full md:w-auto bg-white hover:bg-slate-50 text-slate-900 font-black py-4 px-7 rounded-full text-xs sm:text-sm inline-flex items-center justify-center gap-2.5 shadow-lg active:scale-98 transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#1F5E4B] group-hover:rotate-12 transition-transform" />
              <span>ديري التشخيص المجاني</span>
              <ArrowLeft className="w-4 h-4 text-[#1F5E4B] rtl:rotate-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
