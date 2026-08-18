import { Truck, Banknote, ShieldCheck, Headphones, Gift } from 'lucide-react';

export const TrustReassuranceStrip = () => {
  const items = [
    {
      icon: Truck,
      title: 'توصيل سريع',
      subtitle: 'في جميع المدن',
    },
    {
      icon: Banknote,
      title: 'الدفع عند الاستلام',
      subtitle: 'آمن وموثوق',
    },
    {
      icon: ShieldCheck,
      title: 'منتجات أصلية 100%',
      subtitle: 'مضمونة',
    },
    {
      icon: Headphones,
      title: 'دعم عملاء',
      subtitle: 'متاح دائماً',
    },
    {
      icon: Gift,
      title: 'تغليف فاخر',
      subtitle: 'جاهز للهدايا',
    },
  ];

  return (
    <section className="px-4 py-3">
      <div className="bg-white rounded-2xl border border-slate-100/90 p-3.5 shadow-2xs">
        <div className="grid grid-cols-5 gap-1 text-center">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-1 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-1">
                  <Icon className="w-4 h-4 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-bold text-slate-900 leading-tight block">
                  {item.title}
                </span>
                <span className="text-[8.5px] text-slate-500 leading-tight mt-0.5 block">
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
