import { useState } from 'react';
import { MessageCircle, X, ChevronUp, Sparkles, Send } from 'lucide-react';

export const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickQuestions = [
    {
      id: 'q1',
      text: 'شنو يناسب نوع بشرتي؟',
      msg: 'Salam Belmo, bghit nstafser chno howa routine li kaynasb no3 bachrti?',
    },
    {
      id: 'q2',
      text: 'واش هاد المنتج مناسب ليا؟',
      msg: 'Salam, bghit n3raf wach had lmontaj kaynasb lbachra dyali?',
    },
    {
      id: 'q3',
      text: 'بغيت نعرف كيفاش نستعملو',
      msg: 'Salam Belmo, momkin tari9at sti3mal routine lkori?',
    },
    {
      id: 'q4',
      text: 'تتبع الطلبية ديالي',
      msg: 'Salam, bghit ntbe3 commande dyali.',
    },
  ];

  const handleOpenWhatsApp = (customMsg?: string) => {
    const defaultMsg = 'Salam Belmo, bghit nstafser 3la rroutine dyali…';
    const textToSend = encodeURIComponent(customMsg || defaultMsg);
    window.open(`https://wa.me/212600000000?text=${textToSend}`, '_blank');
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 left-4 z-40 flex flex-col items-start pointer-events-auto">
      {/* Expanded Quick Questions Menu (Section 12) */}
      {isOpen && (
        <div className="mb-2 bg-white rounded-3xl p-4 shadow-2xl border border-emerald-950/10 w-72 text-right animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer hover:bg-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>مستشارة Belmo كورية</span>
            </div>
          </div>

          <p className="text-[11px] font-bold text-slate-700 mb-2">
            شنو بغيتي تعرفي؟
          </p>

          <div className="space-y-1.5 mb-3">
            {quickQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleOpenWhatsApp(q.msg)}
                className="w-full text-right text-[11px] font-medium text-slate-800 bg-[#F4FAF6] hover:bg-[#EAF5EF] p-2.5 rounded-xl transition-colors flex items-center justify-between gap-1 group cursor-pointer"
              >
                <span>{q.text}</span>
                <Send className="w-3 h-3 text-[#1F5E4B] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          <button
            onClick={() => handleOpenWhatsApp()}
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
            <span>تواصلي مع Belmo على واتساب</span>
          </button>
        </div>
      )}

      {/* Floating Collapsed Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/95 backdrop-blur-md hover:bg-white text-slate-900 border border-emerald-950/10 shadow-lg rounded-full p-1.5 pr-3 pl-2 flex items-center gap-2 active:scale-95 transition-all cursor-pointer group"
      >
        <div className="text-right leading-tight">
          <span className="text-[11px] font-black text-slate-900 block">
            محتارة؟
          </span>
          <span className="text-[10px] font-bold text-[#1F5E4B] block">
            سولينا دابا
          </span>
        </div>

        <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform relative">
          <MessageCircle className="w-5 h-5 fill-white stroke-none" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
        </div>
      </button>
    </div>
  );
};
