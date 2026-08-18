import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, ShoppingBag, Volume2, VolumeX, Sparkles, ChevronRight, ChevronLeft, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface StoryItem {
  id: string;
  titleAr: string;
  captionAr: string;
  videoUrl?: string;
  imageUrl: string;
  tag: string;
  productIds: string[];
}

const FATIMA_STORIES: StoryItem[] = [
  {
    id: 'story-1',
    titleAr: 'روتين الصباح السريع',
    captionAr: 'هاد الواقي الشمسي بالأرز هو السر باش كنحمي بشرتي ونعطيها نضارة بلا أي لمعان مزعج!',
    imageUrl: '/src/assets/images/fatima_ambassador_story_1787069751769.jpg',
    tag: 'ROUTINE DU MATIN',
    productIds: ['boj-relief-sun-rice', 'anua-cleansing-foam'],
  },
  {
    id: 'story-2',
    titleAr: 'علاج التصبغات والآثار',
    captionAr: 'سيروم الجينسنغ و الحلزون هو اللي صفّى ليا وجهي من آثار الحبوب في أقل من 3 سيمانات.',
    imageUrl: '/src/assets/images/fatima_ambassador_story_1787069751769.jpg',
    tag: 'GLOW & REPAIR',
    productIds: ['boj-ginseng-serum', 'axis-y-dark-spot'],
  },
  {
    id: 'story-3',
    titleAr: 'تهدئة المسام وترطيب 77%',
    captionAr: 'كريم Anua Heartleaf خفيف بزاف وما كيسدش المسام نهائياً، أحسن مرطب جربتو!',
    imageUrl: '/src/assets/images/fatima_ambassador_story_1787069751769.jpg',
    tag: 'HYDRATATION 77%',
    productIds: ['anua-heartleaf-cream-77', 'anua-77-toner'],
  },
  {
    id: 'story-4',
    titleAr: 'الروتين الكوري الزجاجي الكامل',
    captionAr: 'البنات اللي كيسولوني على الروتين ديالي كامل من Belmo، ها هما الـ 4 خطوات الأصلية!',
    imageUrl: '/src/assets/images/fatima_ambassador_story_1787069751769.jpg',
    tag: 'GLASS SKIN PACK',
    productIds: ['anua-cleansing-foam', 'boj-ginseng-serum', 'anua-heartleaf-cream-77', 'boj-relief-sun-rice'],
  },
];

interface InstagramStoryModalProps {
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const InstagramStoryModal: React.FC<InstagramStoryModalProps> = ({
  isOpen,
  initialIndex = 0,
  onClose,
  onAddToCart,
  onSelectProduct,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
  }, [initialIndex, isOpen]);

  // Story Timer
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = 50; // update progress every 50ms
    const totalDuration = 5000; // 5 seconds per story
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < FATIMA_STORIES.length - 1) {
            setCurrentIndex((curr) => curr + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, currentIndex, isPaused, onClose]);

  if (!isOpen) return null;

  const currentStory = FATIMA_STORIES[currentIndex];
  const storyProducts = PRODUCTS.filter((p) => currentStory.productIds.includes(p.id));

  const handleNext = () => {
    if (currentIndex < FATIMA_STORIES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="relative w-full max-w-sm h-full sm:h-[680px] bg-slate-900 sm:rounded-[36px] overflow-hidden flex flex-col justify-between shadow-2xl">
        
        {/* Background Image / Video Simulation */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentStory.imageUrl}
            alt={currentStory.titleAr}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        </div>

        {/* Top Header: Multi-Segment Progress Bars */}
        <div className="relative z-20 p-4 pt-3 space-y-3">
          {/* Bars */}
          <div className="flex items-center gap-1.5 w-full">
            {FATIMA_STORIES.map((_, idx) => {
              let width = 0;
              if (idx < currentIndex) width = 100;
              else if (idx === currentIndex) width = progress;

              return (
                <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-75 rounded-full"
                    style={{ width: `${width}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Fatima Profile Header & Actions */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-rose-500">
                <img
                  src="/src/assets/images/fatima_ambassador_story_1787069751769.jpg"
                  alt="Fatima-Zahra"
                  className="w-full h-full object-cover rounded-full border border-black"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black">فاطمة الزهراء لحريش</span>
                  <span className="text-[10px] bg-emerald-500/80 px-1.5 py-0.2 rounded-full font-bold">
                    ✓ موثق
                  </span>
                </div>
                <span className="text-[10px] text-slate-300 font-latin font-bold">
                  {currentStory.tag}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                aria-label="إغلاق القصة"
                className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer hover:bg-black/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tap Left / Right Touch Zones */}
        <div
          className="relative z-10 flex-1 grid grid-cols-2"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Left Tap Zone (Prev in RTL / Next in LTR) */}
          <div onClick={handlePrev} className="h-full cursor-pointer" />
          {/* Right Tap Zone */}
          <div onClick={handleNext} className="h-full cursor-pointer" />
        </div>

        {/* Bottom Story Footer: Caption + Featured Products */}
        <div className="relative z-20 p-4 pt-2 bg-gradient-to-t from-black via-black/80 to-transparent space-y-3">
          {/* Story Caption */}
          <div className="text-right">
            <h4 className="text-sm font-black text-white">{currentStory.titleAr}</h4>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              {currentStory.captionAr}
            </p>
          </div>

          {/* Featured Products horizontal slider in this story */}
          <div className="border-t border-white/10 pt-2.5 text-right">
            <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>المنتجات اللي باينة فهاد الفيديو:</span>
            </span>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {storyProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-2 min-w-[210px] max-w-[230px] flex items-center justify-between gap-2 shadow-lg cursor-pointer border border-white/20 shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.nameAr}
                    className="w-11 h-11 object-contain rounded-xl bg-[#F4FAF6] p-1 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 text-right flex-1">
                    <h5 className="text-[11px] font-bold text-slate-900 truncate">
                      {product.nameAr}
                    </h5>
                    <span className="text-[10px] font-latin font-bold text-[#1F5E4B]">
                      {product.price} DH
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="w-8 h-8 rounded-full bg-[#162A22] text-white flex items-center justify-center shrink-0 active:scale-90 transition-transform cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
