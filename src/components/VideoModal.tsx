import { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ShoppingBag, Plus, Sparkles, Heart } from 'lucide-react';
import { VideoItem, Product } from '../types';
import { PRODUCTS } from '../data/products';

interface VideoModalProps {
  video: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const VideoModal = ({
  video,
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}: VideoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen || !video) return null;

  const featuredProducts = PRODUCTS.filter((p) =>
    video.productIds.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative z-10 bg-slate-950 max-w-sm w-full h-[80vh] max-h-[640px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-slate-800">
        {/* Top Floating Controls */}
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full font-latin uppercase shadow-xs">
              {video.tag}
            </span>
            <span className="text-white text-xs font-semibold drop-shadow-md">
              FATIMA × belmo
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Simulation Canvas / Video element */}
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative flex-1 w-full bg-slate-900 cursor-pointer overflow-hidden flex items-center justify-center"
        >
          <img
            src={video.thumbnail}
            alt={video.titleAr}
            className="w-full h-full object-cover"
          />

          {/* Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50 pointer-events-none" />

          {/* Play/Pause state indicator */}
          {!isPlaying && (
            <div className="w-14 h-14 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-xl">
              <Play className="w-6 h-6 fill-slate-900 translate-x-0.5" />
            </div>
          )}

          {/* Live floating video progress line */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
            <div className="h-full bg-sky-400 w-2/3 animate-pulse" />
          </div>
        </div>

        {/* Bottom Products Carousel inside Video */}
        <div className="relative z-20 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-2.5">
          <div className="text-right">
            <h3 className="text-xs font-bold text-white mb-0.5">
              {video.titleAr}
            </h3>
            <p className="text-[11px] text-slate-300">
              المنتجات المستعملة فالفيديو (اضغطي لإضافتها لسلتك)
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProduct(prod);
                }}
                className="min-w-[130px] bg-slate-900/90 backdrop-blur-md rounded-xl p-2 border border-slate-800 flex items-center gap-2 cursor-pointer hover:border-slate-600 transition-colors"
              >
                <div className="w-9 h-9 bg-white rounded-lg p-0.5 shrink-0 flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.nameAr}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-bold text-slate-400 block font-latin truncate">
                    {prod.brand}
                  </span>
                  <span className="text-[10px] font-bold text-white block font-latin">
                    DH {prod.price.toFixed(0)}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(prod);
                  }}
                  className="w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 active:scale-90 transition-transform"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
