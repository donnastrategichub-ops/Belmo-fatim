import { useState } from 'react';
import {
  Mic,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronLeft,
  ArrowUpLeft,
  Image as ImageIcon,
  CheckCheck,
  ZoomIn,
} from 'lucide-react';
import { WhatsAppTestimonial } from '../types';
import { WHATSAPP_TESTIMONIALS } from '../data/testimonials';
import { WhatsAppAudioPlayer } from './WhatsAppAudioPlayer';
import { WhatsAppChatModal } from './WhatsAppChatModal';

interface WhatsAppTestimonialsSectionProps {
  onOpenConsultation?: () => void;
}

export const WhatsAppTestimonialsSection = ({
  onOpenConsultation,
}: WhatsAppTestimonialsSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'audio' | 'screenshot'>('all');
  const [selectedChatTestimonial, setSelectedChatTestimonial] = useState<WhatsAppTestimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTestimonials = WHATSAPP_TESTIMONIALS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const handleOpenChat = (item: WhatsAppTestimonial) => {
    setSelectedChatTestimonial(item);
    setIsModalOpen(true);
  };

  const audioCount = WHATSAPP_TESTIMONIALS.filter((t) => t.type === 'audio').length;
  const chatCount = WHATSAPP_TESTIMONIALS.filter((t) => t.type === 'screenshot').length;

  return (
    <section className="py-8 px-4 bg-gradient-to-b from-white via-[#F7FAF8] to-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-1 rounded-full text-xs font-bold mb-2.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#25D366]" />
            <span>تجارب حقيقية موثقة عبر واتساب</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            رسائل وأوديوات زبوناتنا عبر واتساب
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-lg mx-auto leading-relaxed">
            استمعي لتسجيلات صوتية حقيقية وشوفي سكرينات المحادثات مع زبونات من كازا، الرباط، مراكش وطنجة بعد تجربة روتين فاطمة الزهراء.
          </p>

          {/* Social Proof Trust Metrics */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 text-[11px] font-semibold text-slate-700">
            <div className="flex items-center gap-1">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900 mr-1">4.9 / 5</span>
              <span className="text-slate-400">(+4,800 طلبية موثقة)</span>
            </div>
            <div className="hidden xs:flex items-center gap-1 text-emerald-700 bg-emerald-100/60 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>أصالة المنتجات مضمونة 100%</span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="w-full max-w-full overflow-x-auto no-scrollbar py-1.5 mb-6 flex items-center justify-start sm:justify-center gap-2 px-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-2 touch-manipulation ${
              activeFilter === 'all'
                ? 'bg-[#1F5E4B] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>جميع التجارب</span>
            <span className={`text-[10.5px] font-latin font-bold px-2 py-0.5 rounded-full ${activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {WHATSAPP_TESTIMONIALS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('audio')}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-2 touch-manipulation ${
              activeFilter === 'audio'
                ? 'bg-[#25D366] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>رسائل صوتية (Voice Notes)</span>
            <span className={`text-[10.5px] font-latin font-bold px-2 py-0.5 rounded-full ${activeFilter === 'audio' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {audioCount}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('screenshot')}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-2 touch-manipulation ${
              activeFilter === 'screenshot'
                ? 'bg-[#075E54] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>محادثات وسكرينات</span>
            <span className={`text-[10.5px] font-latin font-bold px-2 py-0.5 rounded-full ${activeFilter === 'screenshot' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {chatCount}
            </span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
          {filteredTestimonials.map((testimonial) => {
            const isAudio = testimonial.type === 'audio';

            return (
              <div
                key={testimonial.id}
                className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between min-w-0 overflow-hidden"
              >
                {/* Header of the Card */}
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    {/* Customer Info */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="relative shrink-0">
                        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500/20 shadow-2xs">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.customerName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {isAudio ? (
                          <div className="absolute -bottom-1 -start-1 w-4 h-4 rounded-full bg-[#25D366] text-white flex items-center justify-center border border-white shadow-2xs">
                            <Mic className="w-2.5 h-2.5" />
                          </div>
                        ) : (
                          <div className="absolute -bottom-1 -start-1 w-4 h-4 rounded-full bg-[#075E54] text-white flex items-center justify-center border border-white shadow-2xs">
                            <MessageSquare className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>

                      <div className="text-right min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <h3 className="font-extrabold text-sm text-slate-900 truncate">
                            {testimonial.customerName}
                          </h3>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                        </div>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {testimonial.customerCity}
                        </span>
                      </div>
                    </div>

                    {/* Tag Badge */}
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full shrink-0 shadow-2xs">
                      {testimonial.tagAr}
                    </span>
                  </div>

                  {/* Product purchased strip */}
                  <div className="bg-slate-50 rounded-xl px-3 py-1.5 mb-3 flex items-center justify-between text-[11px] gap-2 min-w-0 border border-slate-100">
                    <span className="text-slate-500 shrink-0">المنتج:</span>
                    <span className="font-bold text-slate-800 truncate min-w-0 text-left">
                      {testimonial.productPurchased}
                    </span>
                  </div>

                  {/* Body: Voice Note Player OR Chat Preview */}
                  {isAudio ? (
                    <div className="mb-2 min-w-0">
                      <WhatsAppAudioPlayer testimonial={testimonial} />
                    </div>
                  ) : (
                    <div
                      onClick={() => handleOpenChat(testimonial)}
                      className="bg-[#F0F5F2] hover:bg-[#E8F0EB] cursor-pointer rounded-2xl p-3.5 border border-emerald-100 transition-colors group mb-2 min-w-0"
                      role="button"
                      tabIndex={0}
                    >
                      {/* Chat Preview bubble */}
                      <div className="bg-white rounded-xl p-3 shadow-2xs border border-slate-200/60 text-right mb-2.5 min-w-0">
                        <p className="text-xs text-slate-800 leading-relaxed font-medium line-clamp-3 break-words [overflow-wrap:anywhere]">
                          "{testimonial.previewTextAr}"
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-400">
                          <span className="font-semibold text-emerald-700">محادثة واتساب موثقة</span>
                          <div className="flex items-center gap-1 font-latin">
                            <span>{testimonial.time}</span>
                            <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
                          </div>
                        </div>
                      </div>

                      {/* Photo Attachment preview thumbnail if exists */}
                      {testimonial.messages?.some((m) => m.isImage) && (
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#1F5E4B] pt-1">
                          <span className="flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span>تتضمن صورة إثبات الاستلام والتغليف</span>
                          </span>
                          <div className="flex items-center gap-1 text-slate-600 group-hover:text-[#1F5E4B]">
                            <span>عرض المحادثة</span>
                            <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer: Rating & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2 text-[11px]">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-[10px] font-bold text-slate-500 mr-1 font-latin">
                      {testimonial.date}
                    </span>
                  </div>

                  {!isAudio && (
                    <button
                      onClick={() => handleOpenChat(testimonial)}
                      className="text-[#1F5E4B] hover:text-[#184C3C] font-bold inline-flex items-center gap-1 text-[11px] min-h-[36px] px-2 py-1 rounded-lg active:bg-emerald-50 transition-colors"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>تكبير المحادثة</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Direct Help Banner */}
        <div className="mt-8 bg-gradient-to-r from-[#075E54] via-[#128C7E] to-[#075E54] text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
              <MessageSquare className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                بغيتي تسولي على الروتين المناسب لبشرتك؟
              </h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                تواصلي معنا مباشرة عبر واتساب للحصول على استشارة مجانية وفحص طلبك قبل الشحن
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/212600000000?text=%D8%B3%D9%84%D8%A7%D9%85%20%D8%A8%D9%84%D9%91%D9%85%D9%88%D8%8C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D8%B3%D9%88%D9%84%20%D8%B9%D9%84%D9%89%20%D8%B1%D9%88%D8%AA%D9%8A%D9%86%20%D9%81%D8%A7%D8%B7%D9%85%D8%A9%20%D8%A7%D9%84%D8%Bparam8%D9%87%D8%B1%D8%A7%D8%A1"
            target="_blank"
            rel="noreferrer"
            className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs py-3 px-6 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 shrink-0 flex items-center gap-2"
          >
            <span>تواصلي معنا فـ واتساب دابا</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* WhatsApp Chat Lightbox / Modal */}
      <WhatsAppChatModal
        testimonial={selectedChatTestimonial}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedChatTestimonial(null);
        }}
      />
    </section>
  );
};
