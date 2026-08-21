import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingActions = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-collapse if tapped outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isExpanded]);

  const handleOpenWhatsApp = (customMsg?: string) => {
    const defaultMsg = 'Salam Belmo, bghit nstafser 3la rroutine dyali…';
    const textToSend = encodeURIComponent(customMsg || defaultMsg);
    window.open(`https://wa.me/212600000000?text=${textToSend}`, '_blank');
    setIsExpanded(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-3.5 sm:right-5 z-40 flex flex-col items-end pointer-events-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}
    >
      {/* Expanded Quick Questions Menu (Collapses automatically) */}
      {isExpanded && (
        <div className="mb-2 bg-white rounded-2xl p-3.5 shadow-2xl border border-emerald-950/10 w-68 sm:w-72 text-right animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <button
              onClick={() => setIsExpanded(false)}
              className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer hover:bg-slate-200 active:scale-90"
              aria-label="إغلاق"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>محتاجا مساعدة؟ سولينا هنا</span>
            </div>
          </div>

          <div className="space-y-1.5 mb-2.5">
            <button
              onClick={() => handleOpenWhatsApp('Salam Belmo, bghit nstafser chno howa routine li kaynasb bachrti?')}
              className="w-full text-right text-xs font-medium text-slate-800 bg-[#F4FAF6] hover:bg-[#EAF5EF] p-2 rounded-xl transition-colors flex items-center justify-between gap-1 cursor-pointer"
            >
              <span>شنو يناسب نوع بشرتي؟</span>
              <Send className="w-3 h-3 text-[#1F5E4B]" />
            </button>
            <button
              onClick={() => handleOpenWhatsApp('Salam, bghit n3raf wach had lmontaj kaynasbni?')}
              className="w-full text-right text-xs font-medium text-slate-800 bg-[#F4FAF6] hover:bg-[#EAF5EF] p-2 rounded-xl transition-colors flex items-center justify-between gap-1 cursor-pointer"
            >
              <span>واش هاد المنتج مناسب ليا؟</span>
              <Send className="w-3 h-3 text-[#1F5E4B]" />
            </button>
          </div>

          <button
            onClick={() => handleOpenWhatsApp()}
            className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-bold text-xs py-2 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-sm transition-transform cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
            <span>محادثة واتساب مباشرة</span>
          </button>
        </div>
      )}

      {/* Compact Circular Support Button (Default State) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="تواصل عبر واتساب"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-90 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.35)] border-2 border-white transition-all cursor-pointer relative"
      >
        <MessageCircle className="w-6 h-6 fill-white stroke-none" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
      </button>
    </div>
  );
};
