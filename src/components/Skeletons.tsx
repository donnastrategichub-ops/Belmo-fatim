import React from 'react';

// Base Shimmer element
export const Skeleton = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`animate-shimmer bg-[#EEF3F0] rounded-md ${className}`}
      {...props}
    />
  );
};

// 1. Fatima's Essentials 4-Card Grid Skeleton (2 cards per row)
export const FatimasPicksSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
        >
          {/* Top Row: Badges */}
          <div className="flex items-center justify-between mb-2.5">
            <Skeleton className="w-16 h-5 rounded-md" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>

          {/* Aspect Square Image Box */}
          <div className="w-full aspect-square bg-[#F8FAFA] rounded-xl p-3 flex items-center justify-center mb-3">
            <Skeleton className="w-24 h-24 rounded-lg" />
          </div>

          {/* Brand & Name (2 lines) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="w-16 h-3 rounded" />
              <Skeleton className="w-12 h-3 rounded" />
            </div>
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-3/4 h-4 rounded" />
          </div>

          {/* Price & Action */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <Skeleton className="w-20 h-5 rounded" />
              <Skeleton className="w-16 h-4 rounded-md" />
            </div>
            <Skeleton className="w-full h-10 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

// 2. Fatima's Routine & Bundle Skeleton
export const FatimasRoutineSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* 4 Steps Horizontal Flow */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 no-scrollbar">
        {[1, 2, 3, 4].map((step, idx) => (
          <div key={step} className="flex items-center shrink-0">
            <div className="bg-white rounded-2xl p-2.5 border border-slate-200/70 shadow-2xs w-20 sm:w-24 flex flex-col items-center">
              <div className="flex items-center justify-center gap-1 mb-1.5 w-full">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="w-10 h-3 rounded" />
              </div>
              <div className="w-14 h-14 bg-slate-50 rounded-xl p-1 flex items-center justify-center">
                <Skeleton className="w-10 h-10 rounded-lg" />
              </div>
            </div>
            {idx < 3 && (
              <div className="px-1">
                <Skeleton className="w-3.5 h-3.5 rounded-full opacity-40" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Routine Bundle Box Special Card Skeleton */}
      <div className="bg-gradient-to-br from-[#EAF5EF] via-[#E4F2EA] to-[#DCEDE3] rounded-3xl p-4 sm:p-5 border border-[#CDE5D8] shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Skeleton className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl shrink-0" />
          <div className="flex-1 w-full space-y-2.5">
            <div className="flex items-center justify-between">
              <Skeleton className="w-36 h-4 rounded" />
              <Skeleton className="w-20 h-4 rounded-full" />
            </div>
            <Skeleton className="w-48 h-3 rounded" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-24 h-6 rounded" />
              <Skeleton className="w-16 h-4 rounded" />
            </div>
            <div className="grid grid-cols-3 gap-1 pt-1 border-t border-[#CDE5D8]">
              <Skeleton className="h-3 rounded" />
              <Skeleton className="h-3 rounded" />
              <Skeleton className="h-3 rounded" />
            </div>
            <div className="pt-2 flex items-center gap-2">
              <Skeleton className="flex-1 h-9 rounded-full" />
              <Skeleton className="w-9 h-9 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Bestsellers Section Skeleton (2 cards per row)
export const BestsellersSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
        >
          {/* Top Badges */}
          <div className="flex items-center justify-between mb-2.5">
            <Skeleton className="w-16 h-5 rounded-md" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>

          {/* Aspect Square Image */}
          <div className="w-full aspect-square bg-[#F8FAFA] rounded-xl p-3 flex items-center justify-center mb-3">
            <Skeleton className="w-24 h-24 rounded-lg" />
          </div>

          {/* Brand & Name */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="w-16 h-3 rounded" />
              <Skeleton className="w-12 h-3 rounded" />
            </div>
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-3/4 h-4 rounded" />
          </div>

          {/* Price & Button */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <Skeleton className="w-20 h-5 rounded" />
              <Skeleton className="w-16 h-4 rounded-md" />
            </div>
            <Skeleton className="w-full h-10 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. Under 200 DH Grid Skeleton (2 cards per row)
export const Under200GridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5 mb-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-3.5 border border-slate-200/80 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="w-16 h-4 rounded" />
            <Skeleton className="w-7 h-7 rounded-full" />
          </div>
          <div className="w-full aspect-square bg-[#F8FAFA] rounded-xl p-2.5 flex items-center justify-center mb-2.5">
            <Skeleton className="w-20 h-20 rounded-lg" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="w-14 h-2.5 rounded" />
            <Skeleton className="w-full h-3.5 rounded" />
            <Skeleton className="w-3/4 h-3.5 rounded" />
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="w-16 h-4 rounded" />
              <Skeleton className="w-10 h-4 rounded" />
            </div>
            <Skeleton className="w-full h-9 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

// 5. Skin Concern Product Recommendations Skeleton (2 cards per row)
export const SkinConcernProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
        >
          <div className="w-full aspect-square bg-[#F8FAFA] rounded-xl flex items-center justify-center p-2.5 mb-2.5">
            <Skeleton className="w-20 h-20 rounded-lg" />
          </div>
          <Skeleton className="w-14 h-2.5 rounded mb-1" />
          <Skeleton className="w-full h-3.5 rounded mb-2" />
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Skeleton className="w-16 h-4 rounded" />
            <Skeleton className="w-full h-8 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};
