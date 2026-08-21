import React from 'react';
import { Truck, Banknote, ShieldCheck, MessageCircle } from 'lucide-react';

export const TrustReassuranceStrip: React.FC = () => {
  const items = [
    { icon: ShieldCheck, label: 'أصلي 100%' },
    { icon: Banknote, label: 'الدفع عند الاستلام' },
    { icon: Truck, label: 'توصيل سريع' },
    { icon: MessageCircle, label: 'استشارة قبل الشراء' },
  ];

  return (
    <section className="px-3 sm:px-4 py-4 my-4 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto bg-slate-50/80 rounded-2xl border border-slate-100/90 py-3 px-3 sm:px-6 shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 items-center justify-between">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-center sm:justify-start gap-2 py-1 px-2 text-slate-700"
              >
                <div className="w-6 h-6 rounded-full bg-white border border-slate-200/60 flex items-center justify-center text-[#1F5E4B] shrink-0 shadow-2xs">
                  <Icon className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-xs sm:text-xs font-bold text-slate-800 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
