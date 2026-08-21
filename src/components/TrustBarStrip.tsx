import React from 'react';
import { ShieldCheck, Truck, Banknote, CheckCircle2, Sparkles } from 'lucide-react';

interface TrustBarStripProps {
  onWatchVideos?: () => void;
}

export const TrustBarStrip: React.FC<TrustBarStripProps> = ({ onWatchVideos }) => {
  return (
    <section className="px-3 sm:px-4 py-8 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        {/* Tasteful, integrated trust bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Ambassador "As Featured With" Strip */}
          <div
            onClick={onWatchVideos}
            className={`flex items-center gap-3 w-full md:w-auto justify-center md:justify-start ${onWatchVideos ? 'cursor-pointer group' : ''}`}
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-[#FF4D6D] overflow-hidden shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/fatima_ambassador_story_1787069751769.jpg"
                  alt="Fatima Ezzahra Lahrech"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white rounded-full p-0.5 shadow-2xs">
                <CheckCircle2 className="w-3 h-3" />
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4D6D] bg-[#FFF0F3] px-2 py-0.5 rounded-full inline-block">
                  OFFICIAL COLLABORATION
                </span>
                {onWatchVideos && (
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#FF4D6D] transition-colors flex items-center gap-0.5">
                    <span>شاهدي الفيديوهات 🎬</span>
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                As featured with <span className="text-[#1F5E4B]">Fatima Ezzahra Lahrech</span> • بتعاون حصري
              </p>
            </div>
          </div>

          {/* Core Reassurance Pillars */}
          <div className="flex items-center justify-around sm:justify-end gap-3 sm:gap-6 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1F5E4B] shrink-0" />
              <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                كوري أصلي 100%
              </span>
            </div>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-1.5">
              <Banknote className="w-4 h-4 text-[#1F5E4B] shrink-0" />
              <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                الدفع عند الاستلام
              </span>
            </div>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#1F5E4B] shrink-0" />
              <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                توصيل 24/48h لجميع المدن
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
