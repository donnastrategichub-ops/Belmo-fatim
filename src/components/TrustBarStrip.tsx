import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  Banknote,
  CheckCircle2,
  Sparkles,
  Play,
  Eye,
  Heart,
  Video,
  ChevronLeft,
  Crown
} from 'lucide-react';
import { FATIMA_VIDEO_REELS, FatimaVideoReel } from '../data/videos';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { FatimaVideoModal } from './FatimaVideoModal';

interface TrustBarStripProps {
  onAddToCart?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const TrustBarStrip: React.FC<TrustBarStripProps> = ({
  onAddToCart = () => {},
  onSelectProduct = () => {},
}) => {
  const [selectedReel, setSelectedReel] = useState<FatimaVideoReel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReel = (reel: FatimaVideoReel) => {
    setSelectedReel(reel);
    setIsModalOpen(true);
  };

  const handleOpenFirstReel = () => {
    if (FATIMA_VIDEO_REELS.length > 0) {
      handleOpenReel(FATIMA_VIDEO_REELS[0]);
    }
  };

  return (
    <section
      id="official-collaboration-bar"
      className="px-3 sm:px-4 py-8 my-8 w-full max-w-full overflow-hidden scroll-mt-14"
    >
      <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-5">
        
        {/* Main Collaboration & Trust Header Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-4 sm:p-6 transition-all">
          
          {/* Top Row: Ambassador Featured Info & Core Trust Reassurance */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
            
            {/* Ambassador "As Featured With" Collaboration */}
            <div
              onClick={handleOpenFirstReel}
              className="flex items-center gap-3 w-full lg:w-auto justify-between sm:justify-start cursor-pointer group"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-2 ring-[#FF4D6D] ring-offset-2 ring-offset-white overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/src/assets/images/fatima_ambassador_story_1787069751769.jpg"
                    alt="Fatima Ezzahra Lahrech"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                {/* Live Story Pulse Badge */}
                <div className="absolute -top-1 -left-1 flex items-center justify-center">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D6D] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF4D6D]"></span>
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#FF4D6D] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border border-rose-100">
                    <Crown className="w-3 h-3 text-[#FF4D6D]" />
                    <span>OFFICIAL COLLABORATION</span>
                  </span>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenFirstReel();
                    }}
                    className="text-[10px] sm:text-[11px] font-bold text-slate-700 hover:text-[#FF4D6D] bg-slate-50 hover:bg-rose-50 px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1 border border-slate-200/70"
                  >
                    <span>شاهدي الفيديوهات 🎬</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm font-black text-slate-900 mt-1">
                  As featured with <span className="text-[#1F5E4B]">Fatima Ezzahra Lahrech</span> • بتعاون حصري
                </p>
              </div>
            </div>

            {/* Core Reassurance Pillars */}
            <div className="flex items-center justify-around sm:justify-end gap-3 sm:gap-6 w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100/80">
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

          {/* Integrated Video Reels Thumbnails / Stories Row */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between text-right">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900">
                  فيديوهات وتجارب حصرية لفاطمة الزهراء
                </span>
                <span className="text-[10px] bg-rose-50 text-[#FF4D6D] font-bold px-2 py-0.5 rounded-full border border-rose-100">
                  انقري للمشاهدة
                </span>
              </div>

              <button
                type="button"
                onClick={handleOpenFirstReel}
                className="text-[11px] font-bold text-[#1F5E4B] hover:text-[#164336] flex items-center gap-0.5 cursor-pointer"
              >
                <span>تشغيل الريلز</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4 Video Reels Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {FATIMA_VIDEO_REELS.map((reel) => {
                const featuredProd = PRODUCTS.find((p) => reel.productIds.includes(p.id));

                return (
                  <div
                    key={reel.id}
                    onClick={() => handleOpenReel(reel)}
                    className="group relative bg-slate-950 rounded-xl sm:rounded-2xl overflow-hidden aspect-[9/13] sm:aspect-[9/14] flex flex-col justify-between p-2.5 sm:p-3 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-slate-200/60 select-none"
                  >
                    {/* Poster Image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={reel.thumbnail}
                        alt={reel.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-90"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />
                    </div>

                    {/* Top Tag & Duration */}
                    <div className="relative z-10 flex items-center justify-between gap-1 text-white">
                      <span className="bg-[#FF4D6D]/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider">
                        {reel.tag}
                      </span>
                      <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[9px] font-bold font-latin">
                        {reel.duration}
                      </span>
                    </div>

                    {/* Center Play Icon Button */}
                    <div className="relative z-10 self-center my-auto">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 group-hover:bg-[#FF4D6D] group-hover:scale-110 flex items-center justify-center text-white transition-all shadow-md">
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {/* Bottom Title & Product Tag */}
                    <div className="relative z-10 space-y-1 text-right">
                      <div className="flex items-center justify-between text-[9px] text-white/80 font-latin">
                        <span className="flex items-center gap-0.5">
                          <Eye className="w-3 h-3 text-emerald-400" />
                          <span>{reel.views}</span>
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                          <span>{reel.likes}</span>
                        </span>
                      </div>

                      <h4 className="text-[11px] sm:text-xs font-black text-white leading-tight line-clamp-1">
                        {reel.titleAr}
                      </h4>

                      {featuredProd && (
                        <div className="bg-white/20 backdrop-blur-md rounded-lg p-1 border border-white/20 flex items-center justify-between gap-1.5 text-right">
                          <p className="text-[9px] font-bold text-white truncate flex-1">
                            {featuredProd.nameAr}
                          </p>
                          <span className="text-[9.5px] font-black text-rose-300 font-latin shrink-0">
                            {featuredProd.price} DH
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* Video Modal Player with Auto-advance & Direct Purchase */}
      <FatimaVideoModal
        reel={selectedReel}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectReel={(reel) => setSelectedReel(reel)}
        allReels={FATIMA_VIDEO_REELS}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
      />
    </section>
  );
};
