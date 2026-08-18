import { ShieldCheck, Banknote, Truck, FileText, MessageCircle, Eye } from 'lucide-react';

export const TrustBenefits = () => {
  const trustPoints = [
    {
      icon: ShieldCheck,
      titleAr: 'كوري أصلي 100%',
      subAr: 'مستورد مباشرة من كوريا',
    },
    {
      icon: Banknote,
      titleAr: 'الدفع عند الاستلام',
      subAr: 'خلصي غير ملي توصلك',
    },
    {
      icon: Truck,
      titleAr: 'توصيل لجميع المدن',
      subAr: 'سريع حتى لباب دارك',
    },
    {
      icon: FileText,
      titleAr: 'فاتورة مع الطلب',
      subAr: 'ضمان وشفافية كاملة',
    },
    {
      icon: MessageCircle,
      titleAr: 'دعم عبر WhatsApp',
      subAr: 'مساعدة قبل وبعد الشراء',
    },
    {
      icon: Eye,
      titleAr: 'تأكدي من طلبك',
      subAr: 'فحص الكوموند قبل الشحن',
    },
  ];

  return (
    <section className="px-4 py-3">
      <div className="max-w-5xl mx-auto bg-white/95 rounded-[24px] p-4 sm:p-5 border border-emerald-950/5 shadow-[0_4px_20px_rgba(31,94,75,0.03)]">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
          <h2 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1F5E4B]" />
            <span>علاش الناس كيشريو من Belmo؟</span>
          </h2>
          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            ثقة وضمان 100%
          </span>
        </div>

        {/* 6 Reassurance Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-[#F8FAF8] border border-emerald-950/5 text-right"
              >
                <div className="w-8 h-8 rounded-full bg-[#EAF5EF] text-[#1F5E4B] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[11px] font-bold text-slate-900 leading-tight truncate">
                    {point.titleAr}
                  </h3>
                  <p className="text-[9.5px] text-slate-500 font-medium leading-tight truncate mt-0.5">
                    {point.subAr}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
