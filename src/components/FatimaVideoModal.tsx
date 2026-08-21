import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShoppingBag,
  Sparkles,
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ExternalLink,
  Plus
} from 'lucide-react';
import { FatimaVideoReel } from '../data/videos';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface FatimaVideoModalProps {
  reel: FatimaVideoReel | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectReel: (reel: FatimaVideoReel) => void;
  allReels: FatimaVideoReel[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const FatimaVideoModal: React.FC<FatimaVideoModalProps> = ({
  reel,
  isOpen,
  onClose,
  onSelectReel,
  allReels,
  onAddToCart,
  onSelectProduct,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && reel) {
      setIsPlaying(true);
      setVideoError(false);
      setProgress(0);
      
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Fallback safely to muted or story mode without crashing
          setIsMuted(true);
        });
      }
    }
  }, [reel, isOpen]);

  // Story / Video Progress timer
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // loop
        }
        return prev + 1.2;
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying]);

  if (!isOpen || !reel) return null;

  const currentIdx = allReels.findIndex((r) => r.id === reel.id);
  const nextReel = currentIdx < allReels.length - 1 ? allReels[currentIdx + 1] : allReels[0];
  const prevReel = currentIdx > 0 ? allReels[currentIdx - 1] : allReels[allReels.length - 1];

  const featuredProducts = PRODUCTS.filter((p) => reel.productIds.includes(p.id));

  const togglePlay = () => {
    if (videoRef.current && !videoError) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const activeVideoSrc = customVideoUrl || reel.videoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Reel Container (9:16 mobile aspect ratio style) */}
      <div className="relative z-10 w-full max-w-[420px] h-full sm:h-[90vh] max-h-[820px] bg-slate-950 sm:rounded-[32px] overflow-hidden flex flex-col justify-between shadow-2xl border border-white/10">
        
        {/* Top Story Progress Bar */}
        <div className="absolute top-2 inset-x-3 z-30 flex gap-1">
          {allReels.map((r, idx) => {
            let barWidth = '0%';
            if (idx < currentIdx) barWidth = '100%';
            else if (idx === currentIdx) barWidth = `${progress}%`;

            return (
              <div
                key={r.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectReel(r);
                }}
                className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
              >
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{ width: barWidth }}
                />
              </div>
            );
          })}
        </div>

        {/* Top Floating Controls */}
        <div className="absolute top-4 inset-x-0 z-20 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full ring-2 ring-[#FF4D6D] overflow-hidden shadow-sm shrink-0">
              <img
                src="/src/assets/images/fatima_ambassador_story_1787069751769.jpg"
                alt="Fatima Ezzahra Lahrech"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-black">{reel.influencerName}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              </div>
              <span className="text-[10px] text-white/75 font-medium">{reel.tag}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {!videoError && (
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video / Visual Story Canvas */}
        <div className="relative flex-1 bg-black flex items-center justify-center cursor-pointer overflow-hidden" onClick={togglePlay}>
          {!videoError ? (
            <video
              ref={videoRef}
              src={activeVideoSrc}
              poster={reel.thumbnail}
              className="w-full h-full object-cover"
              playsInline
              loop
              muted={isMuted}
              onError={() => setVideoError(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={reel.thumbnail}
                alt={reel.titleAr}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
            </div>
          )}

          {/* Center Play/Pause indicator overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-2xs">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Right Floating Social Interactions */}
          <div className="absolute right-3 bottom-32 z-20 flex flex-col items-center gap-4 text-white">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                liked ? 'bg-rose-500 text-white scale-110' : 'bg-black/40 text-white group-hover:bg-black/60'
              }`}>
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-[10px] font-bold font-latin">{reel.likes}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (navigator.share) {
                  navigator.share({
                    title: reel.titleAr,
                    url: window.location.href,
                  }).catch(() => {});
                }
              }}
              className="flex flex-col items-center gap-1 text-white/90 hover:text-white cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold font-latin">{reel.shares}</span>
            </button>
          </div>

          {/* Previous / Next Arrow Floaters on Desktop */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectReel(prevReel);
            }}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectReel(nextReel);
            }}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Drawer: Fatima Quote & Tagged Products to Add to Cart */}
        <div className="relative z-20 p-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-slate-950/0 text-white space-y-3">
          
          {/* Quote & Review Note */}
          <div className="text-right space-y-1">
            <h3 className="text-sm font-black text-white leading-tight">
              {reel.titleAr}
            </h3>
            <p className="text-xs text-rose-200/90 font-medium leading-relaxed">
              "{reel.quoteAr}"
            </p>
          </div>

          {/* Featured Products Carousel in this Video */}
          {featuredProducts.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block text-right">
                المنتجات المستعملة في هذا الفيديو ({featuredProducts.length}):
              </span>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {featuredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-2 border border-white/15 flex items-center justify-between gap-3 min-w-[260px] max-w-[280px] shrink-0 text-right"
                  >
                    <div
                      onClick={() => onSelectProduct(prod)}
                      className="w-12 h-12 rounded-xl bg-white p-1 overflow-hidden shrink-0 cursor-pointer"
                    >
                      <img
                        src={prod.image}
                        alt={prod.nameAr}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-white truncate">
                        {prod.nameAr}
                      </p>
                      <p className="text-xs font-black text-rose-300 font-latin">
                        {prod.price} DH
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart(prod)}
                      className="min-h-[36px] bg-[#FF4D6D] hover:bg-[#E11D48] active:scale-95 text-white px-3 py-1.5 rounded-xl text-[11px] font-black flex items-center gap-1 shrink-0 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>طلب</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional: Add custom video URL toggle */}
          <div className="text-center pt-1">
            {showCustomInput ? (
              <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl text-right">
                <input
                  type="url"
                  placeholder="ألصقي رابط فيديو MP4 خاص..."
                  value={customVideoUrl}
                  onChange={(e) => setCustomVideoUrl(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-white placeholder:text-white/40 px-2 focus:outline-none text-right font-latin"
                />
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="text-[10px] text-white/80 bg-white/20 px-2 py-1 rounded-lg"
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="text-[9.5px] text-white/40 hover:text-white/70 transition-colors"
              >
                تغيير رابط الفيديو المخصص (Custom MP4)
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
