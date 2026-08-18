import { useState } from 'react';
import { Sparkles, Clock, ChevronLeft, ChevronRight, Activity, Scan, ArrowUpLeft } from 'lucide-react';

interface SkinHealthReportCardProps {
  onOpenScanner: () => void;
  onOpenRoutine: () => void;
}

export const SkinHealthReportCard = ({
  onOpenScanner,
  onOpenRoutine,
}: SkinHealthReportCardProps) => {
  const [glowScore] = useState(78);

  // Circular progress calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (glowScore / 100) * circumference;

  const todayFormatted = new Intl.DateTimeFormat('ar-MA', {
    day: 'numeric',
    month: 'short',
  }).format(new Date());

  return (
    <section className="px-4 py-2 sm:py-3">
      <div className="max-w-5xl mx-auto space-y-3">
        {/* Main Skin Health Report Card (Directly inspired by Screen 2 in UI) */}
        <div className="bg-white rounded-[28px] p-4 sm:p-5 border border-emerald-950/5 shadow-[0_8px_30px_rgb(31,94,75,0.04)] relative overflow-hidden">
          {/* Top Row: Title + Circular Radial Gauge */}
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-latin">
                HEALTH REPORT
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-0.5">
                تقرير صحة ونضارة البشرة
              </h3>
            </div>

            {/* Circular Glow Score Ring */}
            <div
              onClick={onOpenScanner}
              className="relative w-14 h-14 flex items-center justify-center cursor-pointer group shrink-0"
              title="فحص وتحليل البشرة بالذكاء الاصطناعي"
            >
              <svg className="w-full h-full -rotate-90" viewBox="0 0 54 54">
                <circle
                  cx="27"
                  cy="27"
                  r={radius}
                  className="text-[#EAF5EF] stroke-current"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  cx="27"
                  cy="27"
                  r={radius}
                  className="text-[#1F5E4B] stroke-current transition-all duration-1000 ease-out"
                  strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <Scan className="w-4 h-4 text-[#1F5E4B] group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

          {/* Sub-cards Row: Dark contrast status block + Last Scan */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Dark status capsule */}
            <div
              onClick={onOpenScanner}
              className="bg-[#162A22] text-white rounded-2xl p-3 flex flex-col justify-between cursor-pointer hover:bg-[#1C352B] transition-colors shadow-2xs group"
            >
              <div className="flex items-center justify-between text-[10px] text-emerald-200/80 font-medium">
                <span>معدل نضارة البشرة</span>
                <Sparkles className="w-3 h-3 text-emerald-300 fill-emerald-300/40" />
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-black font-latin tracking-tight text-white">
                  {glowScore}%
                </span>
                <span className="text-[10px] font-bold text-emerald-300 bg-white/10 px-2 py-0.5 rounded-full font-arabic">
                  صحي ومتوهج
                </span>
              </div>
            </div>

            {/* Last Scan & Action block */}
            <div
              onClick={onOpenScanner}
              className="bg-[#F4F8F5] rounded-2xl p-3 flex flex-col justify-between border border-[#E1ECE5] cursor-pointer hover:bg-[#EAF3EE] transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span>آخر فحص ذكي</span>
                <Activity className="w-3 h-3 text-[#1F5E4B]" />
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-slate-900 block font-latin">
                    اليوم، 10:30 ص
                  </span>
                  <span className="text-[10px] text-[#1F5E4B] font-bold">
                    إعادة الفحص المباشر ◀
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Routine Capsule Strip (Directly inspired by Screen 2 in UI) */}
        <div
          onClick={onOpenRoutine}
          className="bg-white rounded-2xl p-3 sm:p-3.5 border border-emerald-950/5 shadow-2xs flex items-center justify-between cursor-pointer hover:border-[#1F5E4B]/30 hover:shadow-xs transition-all group"
          role="button"
          tabIndex={0}
        >
          <div className="flex items-center gap-3">
            {/* Clock icon inside soft mint circle */}
            <div className="w-10 h-10 rounded-full bg-[#EAF5EF] border border-[#D5EADB] text-[#1F5E4B] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5 stroke-[2]" />
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 font-latin">
                  {todayFormatted}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  روتين فاطمة اليومي (Daily Routine)
                </span>
              </div>
              <span className="text-[11px] text-[#1F5E4B] font-medium block mt-0.5">
                4 خطوات مكتملة • متوفر كـ باقة مخفضة
              </span>
            </div>
          </div>

          {/* Today CTA indicator pill */}
          <div className="flex items-center gap-1 bg-[#F2FAF5] border border-[#D5EADB] text-[#1F5E4B] text-[11px] font-bold px-3 py-1.5 rounded-full group-hover:bg-[#1F5E4B] group-hover:text-white transition-colors shrink-0">
            <span>عرض الروتين</span>
            <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
          </div>
        </div>
      </div>
    </section>
  );
};
