import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  Banknote,
  MessageCircle,
  Play,
  Eye,
  Heart,
  ArrowDown,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { FATIMA_VIDEO_REELS, FatimaVideoReel } from '../data/videos';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { FatimaVideoModal } from './FatimaVideoModal';

interface TrustBarStripProps {
  onAddToCart?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  onShopCollection?: () => void;
}

export const TrustBarStrip: React.FC<TrustBarStripProps> = ({
  onAddToCart = () => {},
  onSelectProduct = () => {},
  onShopCollection,
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

  const handlePrimaryCTA = () => {
    if (onShopCollection) {
      onShopCollection();
    } else {
      const target = document.getElementById('rose-berry-showcase');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        handleOpenFirstReel();
      }
    }
  };

  const trustItems = [
    { icon: ShieldCheck, label: 'أصلي 100%' },
    { icon: Banknote, label: 'الدفع عند الاستلام' },
    { icon: Truck, label: 'توصيل سريع' },
    { icon: MessageCircle, label: 'استشارة قبل الشراء' },
  ];

  return (
    <section
      id="official-collaboration-bar"
      className="px-3 sm:px-4 py-4 my-4 w-full max-w-full overflow-hidden scroll-mt-14"
    >
      <div className="w-full max-w-5xl mx-auto space-y-6">
        
        {/* 1. QUIET HORIZONTAL REASSURANCE BAR */}
        <div className="bg-slate-50/80 border border-slate-100/90 rounded-2xl py-3 px-3 sm:px-6 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 items-center justify-between">
            {trustItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center sm:justify-start gap-2 py-1 px-2 text-slate-700"
                >
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-200/60 flex items-center justify-center text-[#1F5E4B] shrink-0 shadow-2xs">
                    <Icon className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. LUXURY COLLABORATION EDITORIAL HERO & REELS */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 shadow-lg text-white p-6 sm:p-8 space-y-6">
          
          {/* Top Editorial Row: Relationship, Headline, Narrative & Primary CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left/Main Column: Clear Fashion Hierarchy */}
            <div className="lg:col-span-8 space-y-3.5 text-right">
              
              {/* Small Clean Eyebrow */}
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#FF4D6D]">
                <span>OFFICIAL COLLABORATION</span>
                <span className="text-white/40">•</span>
                <span className="text-slate-300 font-latin">BELMO × FATIMA EZZAHRA</span>
              </div>

              {/* Main Prominent Headline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                تشكيلة <span className="text-[#FF4D6D]">فاطمة الزهراء لاحريش</span> الحصرية
              </h2>

              {/* Short Elegant Description */}
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl">
                المجموعة المفضلة لدى فاطمة الزهراء من أرقى منتجات العناية الكورية ومكياج روز بيري الأصلي، لتجربة جمال يومية متكاملة تمنحك إشراقة طبيعية.
              </p>

              {/* One Primary CTA Button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrimaryCTA}
                  className="min-h-[44px] bg-[#FF4D6D] hover:bg-[#E11D48] active:scale-95 text-white font-black px-6 py-2.5 rounded-full text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,77,109,0.3)] transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>تسوقي التشكيلة الحصرية</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenFirstReel}
                  className="min-h-[44px] bg-white/10 hover:bg-white/15 active:scale-95 text-white border border-white/20 font-bold px-5 py-2.5 rounded-full text-xs inline-flex items-center justify-center gap-1.5 backdrop-blur-md transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#FF4D6D]" />
                  <span>شاهدي التجارب بالفيديو 🎬</span>
                </button>
              </div>

            </div>

            {/* Right Column: Collaborator Visual Focus */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div
                onClick={handleOpenFirstReel}
                className="relative cursor-pointer group select-none"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-2 ring-[#FF4D6D]/40 ring-offset-4 ring-offset-slate-950 shadow-md group-hover:scale-105 transition-all duration-300">
                  <img
                    src="/src/assets/images/fatima_ambassador_story_1787069751769.jpg"
                    alt="Fatima Ezzahra Lahrech"
                    className="w-full h-full object-cover object-top brightness-95 group-hover:brightness-100 transition-all"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Floating Play Pill */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1 shadow-sm group-hover:bg-[#FF4D6D] transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>شاهدي الريلز</span>
                </div>
              </div>
            </div>

          </div>

          {/* Integrated Real Beauty Video Reels Carousel */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-right">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF4D6D]" />
                <span>تجارب حقيقية وتطبيق المنتجات بالفيديو</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                انقري على أي فيديو للمشاهدة
              </span>
            </div>

            {/* Horizontal Scrollable Mobile Carousel & Desktop Grid */}
            <div className="w-full overflow-x-auto no-scrollbar flex sm:grid sm:grid-cols-4 gap-3 snap-x snap-mandatory -mx-1 px-1 pb-1">
              {FATIMA_VIDEO_REELS.map((reel) => {
                const featuredProd = PRODUCTS.find((p) => reel.productIds.includes(p.id));

                return (
                  <div
                    key={reel.id}
                    onClick={() => handleOpenReel(reel)}
                    className="w-[230px] sm:w-auto shrink-0 snap-start group relative bg-slate-950 rounded-2xl overflow-hidden aspect-[9/13.5] flex flex-col justify-between p-3 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-800 select-none"
                  >
                    {/* Real Product & Collaborator Thumbnail */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={reel.thumbnail}
                        alt={reel.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40" />
                    </div>

                    {/* Top Duration & Minimal Tag */}
                    <div className="relative z-10 flex items-center justify-between gap-1 text-white">
                      <span className="bg-black/60 backdrop-blur-md text-white border border-white/10 px-2 py-0.5 rounded-full text-[9px] font-bold">
                        {reel.tag}
                      </span>
                      <span className="bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[9px] font-bold font-latin">
                        {reel.duration}
                      </span>
                    </div>

                    {/* Centered Play Trigger */}
                    <div className="relative z-10 self-center my-auto">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 group-hover:bg-[#FF4D6D] group-hover:scale-110 flex items-center justify-center text-white transition-all shadow-md">
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {/* Bottom Meta & Connected Product Badge */}
                    <div className="relative z-10 space-y-1.5 text-right">
                      <div className="flex items-center justify-between text-[9px] text-slate-300 font-latin">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-emerald-400" />
                          <span className="font-bold">{reel.views}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                          <span className="font-bold">{reel.likes}</span>
                        </span>
                      </div>

                      <h4 className="text-xs font-black text-white leading-tight line-clamp-1">
                        {reel.titleAr}
                      </h4>

                      {/* Linked Product Preview */}
                      {featuredProd && (
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/15 flex items-center justify-between gap-1.5 text-right">
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <img
                              src={featuredProd.image}
                              alt={featuredProd.nameAr}
                              className="w-5 h-5 rounded-md object-cover shrink-0 border border-white/20"
                            />
                            <p className="text-[9px] font-bold text-white truncate">
                              {featuredProd.nameAr}
                            </p>
                          </div>
                          <span className="text-[9.5px] font-black text-rose-200 font-latin shrink-0">
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
