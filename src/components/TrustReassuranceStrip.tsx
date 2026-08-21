import { Truck, Banknote, ShieldCheck, Headphones, Gift } from 'lucide-react';

export const TrustReassuranceStrip = () => {
  const items = [
    {
      icon: Truck,
      title: 'توصيل سريع',
      subtitle: '24-48h',
    },
    {
      icon: Banknote,
      title: 'الدفع عند الاستلام',
      subtitle: 'آمن وموثوق',
    },
    {
      icon: ShieldCheck,
      title: 'كوري 100%',
      subtitle: 'أصلي ومضمون',
    },
    {
      icon: Headphones,
      title: 'دعم مباشر',
      subtitle: 'واتساب متاح',
    },
    {
      icon: Gift,
      title: 'تغليف فاخر',
      subtitle: 'مجاناً للطلب',
    },
  ];

  return (
    <section className="px-3 sm:px-4 py-8 my-8 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-5 gap-2 text-center">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1F5E4B] mb-2 shadow-2xs">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight block truncate w-full">
                  {item.title}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 leading-tight mt-1 block truncate w-full">
                  {item.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
