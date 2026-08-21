import React, { useState } from 'react';
import {
  Play,
  Sparkles,
  Crown,
  Video,
  CheckCircle2,
  Eye,
  Heart,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';
import { FATIMA_VIDEO_REELS, FatimaVideoReel } from '../data/videos';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { FatimaVideoModal } from './FatimaVideoModal';

interface FatimaVideoSectionProps {
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const FatimaVideoSection: React.FC<FatimaVideoSectionProps> = ({
  onAddToCart,
  onSelectProduct,
}) => {
  const [selectedReel, setSelectedReel] = useState<FatimaVideoReel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReel = (reel: FatimaVideoReel) => {
    setSelectedReel(reel);
    setIsModalOpen(true);
  };

  return (
    <section id="fatima-videos-section" className="px-3 sm:px-4 py-8 sm:py-12 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFF0F3] text-[#FF4D6D] border border-rose-200/80 px-3.5 py-1 rounded-full text-xs font-black mb-2 shadow-2xs">
              <Video className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span>فيديوهات وتجارب حصرية • فاطمة الزهراء لحرش</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-end gap-2">
              <span>شاهدي تجارب وأنبوكسينغ فاطمة الزهراء</span>
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              اضغطي على أي فيديو لمشاهدة شرح المنتجات، درجات الألوان، وطريقة الاستعمال الصحيحة مع إمكانية الطلب مباشرة.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              {FATIMA_VIDEO_REELS.length} ريلز وتجارب
            </span>
          </div>
        </div>

        {/* Video Reels Grid / Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {FATIMA_VIDEO_REELS.map((reel) => {
            const featuredProd = PRODUCTS.find((p) => reel.productIds.includes(p.id));

            return (
              <div
                key={reel.id}
                onClick={() => handleOpenReel(reel)}
                className="group relative bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/14] sm:aspect-[9/15] flex flex-col justify-between p-3.5 sm:p-4 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/50 select-none"
              >
                {/* Background Poster Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={reel.thumbnail}
                    alt={reel.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
                </div>

                {/* Top Badge & Duration */}
                <div className="relative z-10 flex items-center justify-between gap-1.5 text-white">
                  <span className="bg-[#FF4D6D]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs">
                    {reel.tag}
                  </span>

                  <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold font-latin">
                    {reel.duration}
                  </span>
                </div>

                {/* Center Big Play Button with Pulse */}
                <div className="relative z-10 self-center my-auto">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/40 group-hover:bg-[#FF4D6D] group-hover:scale-110 flex items-center justify-center text-white transition-all shadow-lg">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Content & Direct Product Chip */}
                <div className="relative z-10 space-y-2 text-right">
                  <div className="flex items-center justify-between text-[10.5px] text-white/80 font-latin">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{reel.views}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                      <span>{reel.likes}</span>
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-white leading-snug line-clamp-2">
                    {reel.titleAr}
                  </h3>

                  {featuredProd && (
                    <div className="bg-white/15 backdrop-blur-md rounded-xl p-1.5 border border-white/20 flex items-center justify-between gap-2 text-right">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-white truncate">
                          {featuredProd.nameAr}
                        </p>
                        <p className="text-[11px] font-black text-rose-300 font-latin">
                          {featuredProd.price} DH
                        </p>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white p-0.5 shrink-0 overflow-hidden">
                        <img
                          src={featuredProd.image}
                          alt={featuredProd.nameAr}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Video Modal Player */}
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
