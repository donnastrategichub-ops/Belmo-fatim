import { Star, Heart, ArrowUpLeft, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/products';

interface ReviewsSectionProps {
  onViewAll?: () => void;
}

export const ReviewsSection = ({ onViewAll }: ReviewsSectionProps) => {
  const avatars = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  ];

  return (
    <section className="py-6 px-4 bg-white border-b border-slate-100">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            ماذا تقول زبوناتنا
          </h2>
          <Heart className="w-4 h-4 text-[#FF6B81] stroke-[2.2]" />
        </div>

        {/* View All */}
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-full transition-colors"
        >
          <span>عرض الكل</span>
          <ArrowUpLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Reviews Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {REVIEWS.map((rev, idx) => (
          <div
            key={rev.id}
            className="bg-[#F8FAF8] rounded-2xl p-3.5 border border-slate-200/70 shadow-2xs flex flex-col justify-between"
          >
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-xs text-slate-700 leading-relaxed text-right mb-3 flex-1">
              "{rev.commentAr}"
            </p>

            {/* Author details */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 shrink-0">
                <img
                  src={avatars[idx % avatars.length]}
                  alt={rev.authorName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-right">
                <span className="text-[11px] font-bold text-slate-900 block">
                  {rev.authorName}
                </span>
                <span className="text-[9px] text-slate-400 block">{rev.city}</span>
              </div>
              <ShieldCheck className="w-3.5 h-3.5 text-[#1F5E4B]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
