import React from 'react';
import { Play, Sparkles, Eye, Clock } from 'lucide-react';
import { FatimaVideoReel, FATIMA_VIDEO_REELS } from '../data/videos';

interface FatimaCampaignMediaSectionProps {
  onSelectReel: (reel: FatimaVideoReel) => void;
}

export const FatimaCampaignMediaSection: React.FC<FatimaCampaignMediaSectionProps> = ({
  onSelectReel,
}) => {
  // Focus on Rose Berry campaign reels first
  const campaignReels = FATIMA_VIDEO_REELS;

  return (
    <section className="px-3 sm:px-4 py-6 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-4">
        
        {/* Section Header */}
        <div className="text-right space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4D6D] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAMPAIGN MEDIA & TUTORIALS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            شاهدي إطلالة فاطمة الزهراء مع Rose Berry
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
            فيديوهات حصرية وتطبيقات عملية خطوة بخطوة للمكياج والبوكسات الملكية.
          </p>
        </div>

        {/* Video Reel Cards Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {campaignReels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => onSelectReel(reel)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              {/* Video Thumbnail with Overlay */}
              <div className="relative aspect-[9/14] w-full bg-slate-900 overflow-hidden">
                <img
                  src={reel.thumbnail}
                  alt={reel.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-95"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold font-latin px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{reel.duration}</span>
                </div>

                {/* Views Badge */}
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold font-latin px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Eye className="w-2.5 h-2.5 text-[#FF4D6D]" />
                  <span>{reel.views}</span>
                </div>

                {/* Play Button Icon Centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 group-hover:bg-[#FF4D6D] group-hover:text-white text-slate-900 flex items-center justify-center transition-colors shadow-md group-hover:scale-110">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay Title on Thumbnail */}
                <div className="absolute bottom-2.5 inset-x-2.5 text-right">
                  <span className="text-[10px] font-bold text-[#FF4D6D] block">
                    {reel.tag}
                  </span>
                </div>
              </div>

              {/* Title & Product note */}
              <div className="p-3 text-right space-y-1 flex-1 flex flex-col justify-between">
                <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#FF4D6D] transition-colors">
                  {reel.titleAr}
                </h3>
                <span className="text-[10.5px] text-slate-500 line-clamp-1 block pt-1 border-t border-slate-100">
                  {reel.quoteAr}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
