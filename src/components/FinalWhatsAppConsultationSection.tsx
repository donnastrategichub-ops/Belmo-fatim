import React from 'react';
import { MessageCircle, ShieldCheck, HeartHandshake } from 'lucide-react';

export const FinalWhatsAppConsultationSection: React.FC = () => {
  const whatsappUrl = 'https://wa.me/212600000000?text=' + encodeURIComponent('السلام عليكم، بغيت استشارة مع خبيرة بلمو لاختيار المنتجات المناسبة لنوع بشرتي 🤍');

  return (
    <section className="px-3 sm:px-4 py-8 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-right space-y-4">
          
          <div className="flex items-center gap-2 text-[#25D366]">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="text-xs font-bold font-latin uppercase tracking-wider text-slate-500">
              HUMAN SKIN CONSULTATION
            </span>
          </div>

          <div className="space-y-2 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              محتارة بين المنتجات؟ <span className="text-[#1F5E4B]">خليه علينا 🤍</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              تواصلي معنا مباشرة عبر واتساب وخلي خبيرة Belmo تفحص نوع بشرتك واحتياجاتك وتساعدك تختاري الروتين والمكياج الأنسب ليك مجاناً.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[46px] px-7 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>تواصلي معنا عبر واتساب</span>
            </a>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#1F5E4B]" />
              <span>استشارة شخصية ومجانية من خبيرات التجميل</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
