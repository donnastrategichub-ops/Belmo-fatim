import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { WhatsAppTestimonial } from '../types';

interface WhatsAppAudioPlayerProps {
  testimonial: WhatsAppTestimonial;
  compact?: boolean;
}

export const WhatsAppAudioPlayer: React.FC<WhatsAppAudioPlayerProps> = ({
  testimonial,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const totalDuration = testimonial.audioDurationSec || 28;

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<any>(null);

  // Stop audio tone safely
  const stopAudioTone = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (gainNodeRef.current && audioContextRef.current) {
      try {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.05);
      } catch {
        // ignore audio error
      }
    }
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch {
        // ignore
      }
      oscillatorRef.current = null;
    }
  };

  // Start subtle natural speech tone harmonic
  const startAudioTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, ctx.currentTime);

      gain.gain.setValueAtTime(0.012, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;

      const baseFreq = 220;
      const intonationPattern = [0, 18, -12, 25, -8, 20, 0, -15, 12, 28, -5];
      let stepIdx = 0;

      intervalRef.current = setInterval(() => {
        if (oscillatorRef.current && ctx.state === 'running') {
          const delta = intonationPattern[stepIdx % intonationPattern.length];
          oscillatorRef.current.frequency.setTargetAtTime(baseFreq + delta, ctx.currentTime, 0.08);
          stepIdx++;
        }
      }, 200 / playbackSpeed);
    } catch {
      // Audio context might be restricted
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopAudioTone();
    } else {
      setIsPlaying(true);
      startAudioTone();
    }
  };

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.5 * playbackSpeed;
          if (next >= totalDuration) {
            setIsPlaying(false);
            stopAudioTone();
            return 0;
          }
          return next;
        });
      }, 500);
    } else {
      stopAudioTone();
    }

    return () => {
      if (timer) clearInterval(timer);
      stopAudioTone();
    };
  }, [isPlaying, playbackSpeed, totalDuration]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(100, (currentTime / totalDuration) * 100);

  // Elegant, subtle micro-waveform heights
  const waveformBars = [
    25, 40, 60, 85, 45, 70, 90, 55, 35, 75, 95, 65, 40, 55, 85, 60, 45, 75, 55, 35, 50, 70, 80, 50, 30, 45, 65,
  ];

  const handleSeek = (index: number) => {
    const seekSecs = (index / waveformBars.length) * totalDuration;
    setCurrentTime(seekSecs);
  };

  const cycleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playbackSpeed === 1) setPlaybackSpeed(1.5);
    else if (playbackSpeed === 1.5) setPlaybackSpeed(2);
    else setPlaybackSpeed(1);
  };

  return (
    <div className="space-y-3 text-right">
      
      {/* 💬 Friendly Customer Quote (Sharing with a friend) */}
      {testimonial.audioSummaryAr && (
        <div className="relative bg-[#F8FAF9] rounded-2xl p-3 sm:p-3.5 border border-slate-100/90 text-slate-800">
          <Quote className="w-3.5 h-3.5 text-emerald-600/40 mb-1 rotate-180" />
          <p className="text-xs sm:text-[13px] leading-relaxed font-medium text-slate-700">
            "{testimonial.audioSummaryAr}"
          </p>
        </div>
      )}

      {/* 🎙️ Natural Voice Note Strip (Compact & Signature Belmo Style) */}
      <div className="bg-[#EBF7F0]/80 border border-[#25D366]/25 rounded-2xl p-3 flex items-center gap-3 transition-colors shadow-2xs">
        
        {/* Play / Pause Action Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'إيقاف التسجيل الصوتي' : 'تشغيل التسجيل الصوتي'}
          className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer ${
            isPlaying
              ? 'bg-[#1F5E4B] text-white ring-2 ring-[#25D366]/30'
              : 'bg-[#25D366] hover:bg-[#1EBE5D] text-white'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Subtle Waveform & Scrubber */}
        <div className="flex-1 min-w-0">
          <div
            className="flex items-center gap-0.5 sm:gap-1 h-5 cursor-pointer py-0.5"
            dir="ltr"
          >
            {waveformBars.map((height, idx) => {
              const barProgress = (idx / waveformBars.length) * 100;
              const isPassed = barProgress <= progressPercent;

              return (
                <div
                  key={idx}
                  onClick={() => handleSeek(idx)}
                  className="flex-1 flex items-center justify-center h-full group"
                >
                  <div
                    className={`w-full rounded-full transition-all duration-150 ${
                      isPassed
                        ? isPlaying
                          ? 'bg-[#1F5E4B]'
                          : 'bg-[#25D366]'
                        : 'bg-emerald-200/70 group-hover:bg-emerald-300'
                    }`}
                    style={{
                      height: `${height}%`,
                      minHeight: '3px',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Time, Speed & Status */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span className="font-bold text-[#1F5E4B] text-[10.5px]">
              {formatTime(currentTime)} / {testimonial.audioDuration || formatTime(totalDuration)}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={cycleSpeed}
                className="bg-white hover:bg-slate-50 text-[9px] font-bold text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                title="سرعة التشغيل"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 📖 Expandable Full Experience / Transcript */}
      {testimonial.audioTranscriptionAr && (
        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1F5E4B] hover:text-[#164336] transition-colors cursor-pointer py-1"
          >
            <span>{showTranscript ? 'إخفاء التجربة' : 'قراءة التجربة كاملة'}</span>
            {showTranscript ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showTranscript && (
            <div className="mt-2 bg-white rounded-xl p-3 border border-slate-200/70 text-xs text-slate-700 leading-relaxed shadow-2xs animate-in fade-in-50 duration-150">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">
                نص الرسالة الصوتية الموثقة:
              </span>
              <p className="italic text-slate-800">
                "{testimonial.audioTranscriptionAr}"
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
