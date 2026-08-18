import { Play, Sparkles, ArrowDown, Heart, CheckCircle2 } from 'lucide-react';
import { VideoItem } from '../types';

interface FatimaWhyBelmoProps {
  onPlayVideo: (video: VideoItem) => void;
  onScrollToRoutine: () => void;
}

export const FatimaWhyBelmo = ({ onPlayVideo, onScrollToRoutine }: FatimaWhyBelmoProps) => {
  const videoData: VideoItem = {
    id: 'video-fatima-why',
    titleAr: 'روتين فاطمة الزهراء لحريش اليومي',
    tag: 'REEL • INSTAGRAM STORY',
    duration: '0:32',
    thumbnail: '/src/assets/images/fatima_ambassador_story_1787069751769.jpg',
    views: '48.2k',
    productIds: ['anua-cleansing-foam', 'boj-ginseng-serum', 'anua-heartleaf-cream-77', 'boj-relief-sun-rice'],
  };

  return (
    <section id="fatima-section" className="px-4 py-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[28px] p-5 sm:p-7 border border-emerald-950/5 shadow-[0_4px_25px_rgba(31,94,75,0.03)]">
        
        {/* Top Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF0F3] text-[#FF4D6D] px-3.5 py-1 rounded-full text-[11px] font-bold shadow-2xs mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#FF4D6D]" />
            <span>Story & Reels • Belmo Ambassador</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            شفتي فاطمة فـ Story؟
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            هادي هي المنتجات اللي كتستعمل وكتختار من Belmo كل يوم
          </p>
        </div>

        {/* Centerpiece Social-Native Vertical Video Card */}
        <div className="flex flex-col items-center">
          <div
            onClick={() => onPlayVideo(videoData)}
            className="relative w-full max-w-sm sm:max-w-md aspect-[9/12] sm:aspect-[9/11] rounded-[28px] overflow-hidden shadow-lg cursor-pointer group bg-slate-900 border-2 border-white/80"
            role="button"
            tabIndex={0}
            aria-label="مشاهدة روتين فاطمة الزهراء اليومي"
          >
            {/* Background Influencer Frame */}
            <img
              src={videoData.thumbnail}
              alt="فاطمة الزهراء لحريش - سفيرة Belmo"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

            {/* Top Story Indicator Chips */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-[10.5px] font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>فاطمة الزهراء لحريش</span>
              </div>
              <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px] font-latin font-bold">
                {videoData.duration}
              </span>
            </div>

            {/* Center Reel Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 group-active:scale-95">
                <Play className="w-7 h-7 fill-slate-900 translate-x-0.5" />
              </div>
            </div>

            {/* Bottom Overlay: The 4 Steps Hook & Darija Direct Quote */}
            <div className="absolute bottom-4 inset-x-4 text-right text-white space-y-1 pointer-events-none">
              <div className="inline-flex items-center gap-1 bg-[#1F5E4B] text-white text-[10.5px] font-bold px-2.5 py-0.5 rounded-full mb-1">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                <span>روتين فاطمة اليومي — 4 خطوات فقط</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                "بشرتي رجعات فيها النضارة بلا تعقيد"
              </h3>
              <p className="text-[11px] text-slate-200">
                كليكي باش تشوفي الفيديو والنتيجة الحقيقية ✨
              </p>
            </div>
          </div>

          {/* Quick CTA to jump directly to the bundle */}
          <div className="mt-4 w-full max-w-sm sm:max-w-md">
            <button
              onClick={onScrollToRoutine}
              className="w-full bg-[#162A22] hover:bg-[#1F5E4B] text-white font-black py-3.5 px-6 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer min-h-[44px]"
            >
              <span>جربي روتين فاطمة (4 خطوات)</span>
              <ArrowDown className="w-4 h-4 text-emerald-300 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
