import React from 'react';
import { ArrowLeft, Sparkles, Award } from 'lucide-react';

interface OfficialCollaborationSectionProps {
  onDiscoverCollection: () => void;
}

export const OfficialCollaborationSection: React.FC<OfficialCollaborationSectionProps> = ({
  onDiscoverCollection,
}) => {
  return (
    <section className="px-3 sm:px-4 py-6 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-[#0F172A] rounded-2xl md:rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-slate-800 shadow-md">
          
          {/* Subtle Background Ambience */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF4D6D]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1F5E4B]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Text and Branding */}
            <div className="text-right space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-[#FF4D6D] uppercase font-latin bg-black/40 px-3 py-1 rounded-full border border-white/10">
                <Award className="w-3.5 h-3.5" />
                <span>OFFICIAL COLLABORATION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                BELMO <span className="text-slate-400 font-normal">×</span> FATIMA EZZAHRA
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                اختيارات حصرية مستوحاة من إطلالة فاطمة الزهراء مع Rose Berry، تجمع بين نعومة العناية وفخامة المكياج الإماراتي الملكي.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onDiscoverCollection}
                  className="min-h-[44px] px-6 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm rounded-xl inline-flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  <span>اكتشفي المجموعة</span>
                  <ArrowLeft className="w-4 h-4 rtl:rotate-0 text-slate-900" />
                </button>
              </div>
            </div>

            {/* Campaign Visual Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-28 sm:w-36 aspect-square rounded-xl overflow-hidden border border-white/20 bg-slate-800 shadow-sm">
                <img
                  src="/src/assets/images/fatima_ambassador_story_1787069751769.jpg"
                  alt="Fatima Ezzahra Belmo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-28 sm:w-36 aspect-square rounded-xl overflow-hidden border border-white/20 bg-slate-800 shadow-sm">
                <img
                  src="/src/assets/images/kbeauty_gift_box_1787069764163.jpg"
                  alt="Rose Berry Luxury Box"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
