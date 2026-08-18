import { useState } from 'react';
import { X, CheckCheck, Phone, Video, MoreVertical, ShieldCheck, ArrowRight, ArrowLeft, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { WhatsAppTestimonial } from '../types';
import { WhatsAppAudioPlayer } from './WhatsAppAudioPlayer';

interface WhatsAppChatModalProps {
  testimonial: WhatsAppTestimonial | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppChatModal = ({
  testimonial,
  isOpen,
  onClose,
}: WhatsAppChatModalProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!isOpen || !testimonial) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/75 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 bg-[#EFEAE2] max-w-md w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-300">
        {/* WhatsApp Top Header Bar */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 -mr-1"
              aria-label="رجوع"
            >
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </button>

            {/* Avatar & Online status */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.customerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075E54]" />
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm leading-none">
                  {testimonial.customerName}
                </h3>
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              </div>
              <span className="text-[10.5px] text-emerald-100 block mt-0.5">
                {testimonial.customerCity} • زبونة موثقة
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/80">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security / Verification Banner */}
        <div className="bg-[#FFEECD] text-[#523C00] px-3 py-1.5 text-[10px] text-center border-b border-[#F6DC9F] flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#075E54]" />
          <span>محادثة موثقة ومصرح بنشرها عبر واتساب الرسمي لبلّمو</span>
        </div>

        {/* WhatsApp Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#EFEAE2] relative">
          {/* Timestamp Pill */}
          <div className="flex justify-center my-1">
            <span className="bg-white/90 text-slate-600 text-[10px] font-semibold px-3 py-1 rounded-lg shadow-2xs">
              {testimonial.date}
            </span>
          </div>

          {/* Product Tag info bubble */}
          <div className="bg-white/80 border border-slate-200/80 rounded-xl p-2.5 text-center text-xs text-slate-700 mx-auto max-w-[280px] shadow-2xs">
            <span className="text-[10px] text-slate-400 block mb-0.5">المنتجات المطلوبة:</span>
            <span className="font-bold text-[#1F5E4B]">{testimonial.productPurchased}</span>
          </div>

          {/* If Audio Testimonial, render player inside chat bubble */}
          {testimonial.type === 'audio' && (
            <div className="bg-white rounded-2xl p-2.5 shadow-xs border border-slate-200/60 max-w-[92%] ml-auto">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 px-1">
                <span className="font-bold text-slate-700">رسالة صوتية (Voice Note)</span>
                <span>{testimonial.time}</span>
              </div>
              <WhatsAppAudioPlayer testimonial={testimonial} />
            </div>
          )}

          {/* If Chat messages, render authentic WhatsApp bubbles */}
          {testimonial.messages &&
            testimonial.messages.map((msg) => {
              const isCust = msg.sender === 'customer';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isCust ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 shadow-2xs relative text-right ${
                      isCust
                        ? 'bg-white text-slate-900 rounded-tr-none border border-slate-200/60'
                        : 'bg-[#DCF8C6] text-slate-900 rounded-tl-none border border-[#C5E9A5]'
                    }`}
                  >
                    {/* Embedded photo attachment */}
                    {msg.isImage && msg.imageUrl && (
                      <div
                        onClick={() => setSelectedPhoto(msg.imageUrl || null)}
                        className="mb-2 rounded-xl overflow-hidden cursor-pointer group relative border border-black/5"
                      >
                        <img
                          src={msg.imageUrl}
                          alt="WhatsApp Attachment"
                          className="w-full h-44 object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                          <ImageIcon className="w-4 h-4" />
                          <span>تكبير الصورة</span>
                        </div>
                      </div>
                    )}

                    {/* Message text */}
                    {msg.text && (
                      <p className="text-xs leading-relaxed break-words whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    )}

                    {/* Time & Double Checkmark */}
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9.5px] text-slate-400">
                      <span>{msg.time}</span>
                      <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Chat Footer Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors shadow-xs"
          >
            <span>استشيرينا مباشرة على واتساب</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs"
          >
            إغلاق
          </button>
        </div>
      </div>

      {/* Lightbox Zoom for photos */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedPhoto}
            alt="Enlarged screenshot"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
