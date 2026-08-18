import { Play, Clock, Eye, ArrowLeft, Heart } from 'lucide-react';
import { FATIMA_VIDEOS, PRODUCTS } from '../data/products';
import { VideoItem, Product } from '../types';
import { ProductCard } from './ProductCard';

interface FatimaVideosSectionProps {
  onPlayVideo: (video: VideoItem) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddAllVideoProducts: () => void;
}

export const FatimaVideosSection = ({
  onPlayVideo,
  onSelectProduct,
  onAddToCart,
  onAddAllVideoProducts,
}: FatimaVideosSectionProps) => {
  const videoProducts = PRODUCTS.filter((p) => p.isVideoFeatured).slice(0, 4);

  return (
    <section className="px-4 py-5">
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-2xs p-5">
        {/* Section 8 Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center gap-2 text-slate-900 font-bold text-xl tracking-tight">
            <span>شوفي فيديوهات فاطمة</span>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            اكتشفي علاش اختارت هاد المنتجات وطريقة تطبيقها الصحيحة
          </p>
        </div>

        {/* Video Cards Grid (2 vertical/horizontal video preview cards) */}
        <div className="space-y-4 mb-4">
          {FATIMA_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => onPlayVideo(video)}
              className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group shadow-2xs border border-slate-100"
            >
              <img
                src={video.thumbnail}
                alt={video.titleAr}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/40" />

              {/* Top Tag & Views */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full font-latin uppercase">
                  {video.tag}
                </span>

                <span className="bg-slate-900/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-latin">
                  <Eye className="w-3 h-3" />
                  {video.views}
                </span>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all">
                  <Play className="w-5 h-5 fill-slate-900 translate-x-0.5" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-3 inset-x-3 flex items-end justify-between">
                <div className="max-w-[75%]">
                  <h3 className="text-xs font-bold text-white leading-snug drop-shadow-xs">
                    {video.titleAr}
                  </h3>
                </div>

                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-md font-latin flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View all videos link */}
        <button
          onClick={() => onPlayVideo(FATIMA_VIDEOS[0])}
          className="w-full text-xs font-semibold text-slate-700 hover:text-slate-950 flex items-center justify-center gap-1 py-1.5 mb-6"
        >
          <span>شوفي كل الفيديوهات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        {/* SECTION 9 — Products from the Videos */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900">
              المنتجات اللي بانت فالفيديو
            </h3>
            <span className="text-[10px] text-slate-400 font-latin">4 ITEMS</span>
          </div>

          {/* 4 Products Grid (2 cards per row) */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5 mb-5">
            {videoProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                variant="compact"
              />
            ))}
          </div>

          {/* Add all video products CTA */}
          <button
            onClick={onAddAllVideoProducts}
            className="w-full bg-slate-900 hover:bg-slate-950 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] text-xs shadow-xs"
          >
            <span>أضيفيهم كاملين للسلة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
