import React from 'react';
import { ShieldCheck, Banknote, Truck, Gift } from 'lucide-react';

export const TrustBarCompact: React.FC = () => {
  const trustItems = [
    { icon: ShieldCheck, textAr: 'أصلي 100%' },
    { icon: Banknote, textAr: 'الدفع عند الاستلام' },
    { icon: Truck, textAr: 'توصيل سريع' },
    { icon: Gift, textAr: 'تغليف هدايا مجاني' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-2">
      <div className="bg-slate-50/80 border border-slate-200/60 rounded-xl px-3 py-2.5 flex items-center justify-around gap-2 text-slate-700 text-xs font-medium">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-1.5 shrink-0">
              <Icon className="w-3.5 h-3.5 text-[#1F5E4B] stroke-[2.2]" />
              <span className="text-[11px] sm:text-xs font-semibold whitespace-nowrap">{item.textAr}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
