import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Mic, CheckCheck, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { WhatsAppTestimonial } from '../types';

interface WhatsAppAudioPlayerProps {
  testimonial: WhatsAppTestimonial;
  compact?: boolean;
}

export const WhatsAppAudioPlayer = ({ testimonial, compact = false }: WhatsAppAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const totalDuration = testimonial.audioDurationSec || 28;

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<any>(null);

  // Stop audio synthesis on unmount or pause
  const stopAudioTone = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (gainNodeRef.current && audioContextRef.current) {
      try {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.05);
      } catch {
        // ignore audio state error
      }
    }
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch {
        // ignore audio state error
      }
      oscillatorRef.current = null;
    }
  };

  // Start pleasant harmonic speech synthesis simulation
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

      // Vocal formant simulation
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime); // natural vocal fundamental

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      // Very subtle, comfortable volume
      gain.gain.setValueAtTime(0.015, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;

      // Modulate frequency slightly to mimic natural Darija voice intonation rhythm
      const baseFreq = 220;
      const intonationPattern = [0, 20, -15, 30, -10, 25, 0, -20, 15, 35, -5];
      let stepIdx = 0;

      intervalRef.current = setInterval(() => {
        if (oscillatorRef.current && ctx.state === 'running') {
          const delta = intonationPattern[stepIdx % intonationPattern.length];
          oscillatorRef.current.frequency.setTargetAtTime(baseFreq + delta, ctx.currentTime, 0.08);
          stepIdx++;
        }
      }, 200 / playbackSpeed);
    } catch {
      // Audio context might be restricted in some iframe policies
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

  // Playback timer ticker
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

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(100, (currentTime / totalDuration) * 100);

  // Waveform bars (simulated realistic amplitudes)
  const waveformHeights = [
    30, 45, 65, 80, 50, 70, 95, 60, 40, 85, 100, 75, 45, 60, 90, 70, 50, 80, 65, 40, 55, 75, 90, 60, 35, 50, 70,
  ];

  const handleSeek = (index: number) => {
    const seekSecs = (index / waveformHeights.length) * totalDuration;
    setCurrentTime(seekSecs);
  };

  const cycleSpeed = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(1.5);
    else if (playbackSpeed === 1.5) setPlaybackSpeed(2);
    else setPlaybackSpeed(1);
  };

  return (
    <div className="bg-[#E7F8EE]/70 border border-[#25D366]/30 rounded-2xl p-3.5 sm:p-4 text-right">
      {/* Audio Bar UI (Classic WhatsApp Voice Note style) */}
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'إيقاف التسجيل الصوتي' : 'تشغيل التسجيل الصوتي'}
          className={`w-11 h-11 rounded-full shrink-0 flex items-center justify-center transition-all shadow-sm active:scale-95 ${
            isPlaying
              ? 'bg-[#1F5E4B] text-white ring-4 ring-[#25D366]/20'
              : 'bg-[#25D366] hover:bg-[#1EBE5D] text-white'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        {/* Waveform & Scrubber */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-0.5 sm:gap-1 h-8 cursor-pointer py-1" dir="ltr">
            {waveformHeights.map((height, idx) => {
              const barProgress = (idx / waveformHeights.length) * 100;
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
                          ? 'bg-[#1F5E4B] scale-y-105'
                          : 'bg-[#25D366]'
                        : 'bg-slate-300 group-hover:bg-slate-400'
                    }`}
                    style={{
                      height: `${height}%`,
                      minHeight: '4px',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Time & Speed metadata */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span className="font-bold text-[#1F5E4B]">
              {formatTime(currentTime)} / {testimonial.audioDuration || formatTime(totalDuration)}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={cycleSpeed}
                className="bg-white/80 hover:bg-white text-[9px] font-bold text-slate-700 px-1.5 py-0.5 rounded-md border border-slate-200 shadow-2xs transition-colors"
                title="سرعة التشغيل"
              >
                {playbackSpeed}x
              </button>
              <div className="flex items-center text-[#25D366]">
                <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>

        {/* Avatar with Voice mic indicator */}
        <div className="relative shrink-0 hidden xs:block">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-2xs">
            <img
              src={testimonial.avatar}
              alt={testimonial.customerName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-[#25D366] text-white flex items-center justify-center border border-white">
            <Mic className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>

      {/* Audio Summary / Takeaway */}
      {testimonial.audioSummaryAr && (
        <div className="mt-3 pt-2.5 border-t border-[#25D366]/20">
          <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
            "{testimonial.audioSummaryAr}"
          </p>
        </div>
      )}

      {/* Expandable Transcription */}
      {testimonial.audioTranscriptionAr && (
        <div className="mt-2">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1F5E4B] hover:text-[#184C3C] transition-colors"
          >
            <FileText className="w-3 h-3" />
            <span>{showTranscript ? 'إخفاء نص الرسالة الصوتية' : 'قراءة تفريغ الأوديو كاملاً'}</span>
            {showTranscript ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>

          {showTranscript && (
            <div className="mt-2 bg-white/90 rounded-xl p-3 border border-slate-200/80 text-xs text-slate-700 leading-relaxed animate-in fade-in-50 duration-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">
                تفريغ الأوديو (بالدارجة المغربية):
              </span>
              <p className="italic">{testimonial.audioTranscriptionAr}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
