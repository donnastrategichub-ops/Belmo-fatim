import React, { useState } from 'react';
import { X, Play, Volume2, VolumeX, Eye, Sparkles } from 'lucide-react';
import { FatimaVideoReel } from '../data/videos';

interface FatimaVideoModalProps {
  reel: FatimaVideoReel | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FatimaVideoModal: React.FC<FatimaVideoModalProps> = ({
  reel,
  isOpen,
  onClose,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen || !reel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Top Control Bar */}
        <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-auto">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xs text-white hover:bg-black/80 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xs text-white hover:bg-black/80 flex items-center justify-center transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <div className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span>{reel.views}</span>
            </div>
          </div>
        </div>

        {/* Video Simulation Container */}
        <div className="relative aspect-[9/16] w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src={reel.thumbnail}
            alt={reel.titleAr}
            className="w-full h-full object-cover brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

          {/* Playing Simulation Pulse */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center animate-pulse">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Bottom Video Meta & Caption */}
          <div className="absolute bottom-4 inset-x-4 z-10 text-right space-y-2">
            <div className="inline-flex items-center gap-1 bg-[#FF4D6D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>{reel.tag}</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {reel.titleAr}
            </h3>
            <p className="text-xs text-slate-200/90 leading-relaxed bg-black/40 backdrop-blur-xs p-2 rounded-xl">
              "{reel.quoteAr}"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
