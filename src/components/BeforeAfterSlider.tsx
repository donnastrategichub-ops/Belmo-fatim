import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  customerName?: string;
  concernTitle?: string;
  durationText?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = '/src/assets/images/skin_before_after_1787069777078.jpg',
  afterImage = '/src/assets/images/skin_before_after_1787069777078.jpg',
  customerName = 'سناء من الدار البيضاء',
  concernTitle = 'علاج بهتان البشرة والتصبغات بعد 21 يوم من روتين فاطمة',
  durationText = 'النتيجة بعد 3 أسابيع',
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="px-3 sm:px-4 py-4 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-[22px] sm:rounded-[28px] border border-emerald-950/5 shadow-[0_4px_25px_rgba(31,94,75,0.03)] p-3.5 sm:p-6">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 bg-[#EAF5EF] text-[#1F5E4B] px-3.5 py-1 rounded-full text-[11px] font-bold shadow-2xs mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>تجربة زبونة حقيقية وموثقة</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            شوفي النتيجة الحقيقية فبشرتك ✨
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            سحبي الخط باش تشوفي الفرق قبل وبعد الروتين الكوري من Belmo
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-md mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-72 sm:h-80 w-full rounded-[26px] overflow-hidden select-none cursor-ew-resize border-2 border-emerald-950/10 shadow-lg"
          >
            {/* After Image (Full width background) */}
            <img
              src={afterImage}
              alt="بعد استعمال الروتين - نضارة ولمعان"
              className="absolute inset-0 w-full h-full object-cover object-[right_center]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 bg-emerald-950/85 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full shadow-2xs">
              بعد (نضارة ولمعان زجاجي) ✨
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={beforeImage}
                alt="قبل استعمال الروتين - بهتان وجفاف"
                className="absolute inset-0 w-full h-full object-cover object-[left_center] max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full shadow-2xs">
                قبل (بهتان وجفاف)
              </div>
            </div>

            {/* Divider Line & Center Draggable Knob */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center border-2 border-[#1F5E4B] pointer-events-auto cursor-ew-resize">
                <div className="flex items-center text-[10px] font-black">
                  <ChevronLeft className="w-3.5 h-3.5 text-[#1F5E4B]" />
                  <ChevronRight className="w-3.5 h-3.5 text-[#1F5E4B]" />
                </div>
              </div>
            </div>
          </div>

          {/* Result Caption & Verification */}
          <div className="mt-3 p-3 bg-[#F8FAF8] rounded-2xl border border-slate-100 flex items-center justify-between text-right text-xs">
            <div>
              <span className="font-black text-slate-900 block">{customerName}</span>
              <span className="text-[11px] text-slate-500">{concernTitle}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-[#EAF5EF] px-2.5 py-1 rounded-full shrink-0">
              {durationText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
