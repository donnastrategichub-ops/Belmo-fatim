import React, { useState } from 'react';
import { MessageSquare, Star, CheckCheck, Mic, Sparkles } from 'lucide-react';
import { WHATSAPP_TESTIMONIALS } from '../data/testimonials';
import { WhatsAppAudioPlayer } from './WhatsAppAudioPlayer';

interface RealCustomerProofSectionProps {
  onOpenConsultation?: () => void;
}

export const RealCustomerProofSection: React.FC<RealCustomerProofSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'audio' | 'message'>('all');

  const allItems = WHATSAPP_TESTIMONIALS;

  const filtered = activeTab === 'all'
    ? allItems
    : activeTab === 'audio'
    ? allItems.filter((t) => t.type === 'audio')
    : allItems.filter((t) => t.type === 'screenshot' || t.type === 'chat');

  return (
    <section id="customer-proof-section" className="px-3 sm:px-4 py-8 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-5">
        
        {/* Section Header */}
        <div className="text-right space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5E4B] bg-[#F0F7F4] px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تجارب حقيقية موثقة</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            والآن… شوفوا تجارب زبوناتنا 💬
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
            تجارب حقيقية موثقة عبر واتساب بعد تجربة منتجات Rose Berry والعناية الأصلية.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'all'
                ? 'bg-[#1F5E4B] text-white shadow-2xs font-black'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            جميع التجارب ({allItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audio')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'audio'
                ? 'bg-[#1F5E4B] text-white shadow-2xs font-black'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>تسجيلات صوتية (Voice Notes)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('message')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'message'
                ? 'bg-[#1F5E4B] text-white shadow-2xs font-black'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>محادثات واتساب</span>
          </button>
        </div>

        {/* Testimonials Grid (3 Formats: Voice Note, WhatsApp Message, Video Testimonial) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filtered.slice(0, 6).map((item) => {
            const isAudio = item.type === 'audio';

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Header: Avatar, Name, City, Verified badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-slate-700 text-xs">
                        {item.avatar ? (
                          <img
                            src={item.avatar}
                            alt={item.customerName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          item.customerName.charAt(0)
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-900">
                            {item.customerName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({item.customerCity})
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-[#FF4D6D] block truncate">
                          {item.productPurchased}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[#1F5E4B] bg-[#F0F7F4] text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      <CheckCheck className="w-3 h-3" />
                      <span>طلبية موثقة</span>
                    </div>
                  </div>

                  {/* Body Content based on Format */}
                  <div className="py-3">
                    {/* FORMAT 1: VOICE NOTE */}
                    {isAudio && (
                      <div className="space-y-2">
                        <WhatsAppAudioPlayer testimonial={item} />
                        <p className="text-xs text-slate-600 leading-relaxed text-right bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          "{item.audioTranscriptionAr || item.audioSummaryAr || item.previewTextAr}"
                        </p>
                      </div>
                    )}

                    {/* FORMAT 2: WHATSAPP CONVERSATION MESSAGE */}
                    {!isAudio && (
                      <div className="space-y-2">
                        <div className="bg-[#E7F8E8]/70 border border-emerald-100 p-3 rounded-2xl rounded-tr-xs text-right space-y-1">
                          <p className="text-xs text-slate-800 leading-relaxed">
                            {item.previewTextAr || (item.messages && item.messages[0]?.text)}
                          </p>
                          <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 font-latin">
                            <span>{item.date}</span>
                            <CheckCheck className="w-3 h-3 text-[#1F5E4B]" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-latin">تجربة مؤكدة 100%</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
