"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface AppleAudioPlayerProps {
  audioUrl: string;
  title: string;
  subtitle?: string;
  durationText?: string;
  coverImage?: string;
  dark?: boolean;
  variant?: "hero" | "card" | "mini";
  onEnded?: () => void;
  className?: string;
}

const SPEED_OPTIONS = [1, 1.25, 1.5, 1.75, 2, 0.75];

export function AppleAudioPlayer({
  audioUrl,
  title,
  subtitle,
  durationText,
  coverImage,
  dark = false,
  variant = "hero",
  onEnded,
  className = "",
}: AppleAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Format remaining time in negative format (-mm:ss) Apple style
  const formatRemainingTime = (curr: number, dur: number) => {
    if (isNaN(dur) || dur <= 0) return "-0:00";
    const remaining = Math.max(0, dur - curr);
    return `-${formatTime(remaining)}`;
  };

  // Synchronize audio on loaded metadata
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isScrubbing) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio autoplay prevented", err));
    }
  }, [isPlaying]);

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = () => {
    const nextIndex = (speedIndex + 1) % SPEED_OPTIONS.length;
    setSpeedIndex(nextIndex);
    const newSpeed = SPEED_OPTIONS[nextIndex];
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || duration === 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPos = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const seekPercentage = clickPos / rect.width;
    const newTime = seekPercentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Reset state when audioUrl changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.playbackRate = SPEED_OPTIONS[speedIndex];
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [audioUrl, speedIndex, isMuted, volume]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentSpeed = SPEED_OPTIONS[speedIndex];

  // ==========================================
  // CARD / COMPACT MINI PLAYER VARIANT
  // ==========================================
  if (variant === "card" || variant === "mini") {
    return (
      <div
        className={`w-full rounded-3xl p-4 sm:p-5 transition-all border relative overflow-hidden backdrop-blur-xl group ${
          dark
            ? "bg-[#141419]/90 border-white/10 text-white shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
            : "bg-white/95 border-black/[0.08] text-gray-900 shadow-[0_15px_35px_rgba(91,44,29,0.08)]"
        } ${className}`}
      >
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => {
            setIsBuffering(false);
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            if (onEnded) onEnded();
          }}
        />

        {/* Ambient Top Glow */}
        <div
          className={`absolute -top-12 -left-12 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-30 ${
            dark ? "bg-[#d4af37]" : "bg-[#5b2c1d]"
          }`}
        />

        <div className="relative z-10 flex flex-col gap-3.5">
          {/* Header Row: Thumbnail, Title, Badge */}
          <div className="flex items-center gap-3.5">
            <div
              onClick={togglePlay}
              className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer shadow-md group/cover border ${
                dark ? "border-white/10 bg-black/40" : "border-black/5 bg-gray-100"
              }`}
            >
              {coverImage ? (
                <Image src={coverImage} alt={title} fill className="object-cover group-hover/cover:scale-105 transition-transform" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${dark ? "text-[#d4af37]" : "text-[#5b2c1d]"}`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                  </svg>
                </div>
              )}
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity">
                {isPlaying ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    dark
                      ? "bg-[#d4af37]/15 text-[#f5d77f] border-[#d4af37]/30"
                      : "bg-[#5b2c1d]/10 text-[#5b2c1d] border-[#5b2c1d]/20"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  Audio Clase
                </span>
                {durationText && (
                  <span className={`text-[10px] ${dark ? "text-white/40" : "text-gray-400"}`}>
                    {durationText}
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-xs sm:text-sm tracking-tight truncate">{title}</h4>
              {subtitle && (
                <p className={`text-[11px] truncate ${dark ? "text-white/50" : "text-gray-500"}`}>{subtitle}</p>
              )}
            </div>

            {/* Quick Play Button */}
            <button
              onClick={togglePlay}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer flex-shrink-0 ${
                dark
                  ? "bg-gradient-to-tr from-[#d4af37] to-[#f5d77f] text-black hover:brightness-110"
                  : "bg-gradient-to-tr from-[#5b2c1d] to-[#7d3c28] text-white hover:brightness-110"
              }`}
            >
              {isBuffering ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Scrubber & Duration */}
          <div className="space-y-1.5">
            <div
              ref={progressBarRef}
              onClick={handleSeek}
              className={`h-1.5 hover:h-2 rounded-full cursor-pointer transition-all relative ${
                dark ? "bg-white/10" : "bg-black/10"
              }`}
            >
              <div
                className={`h-full rounded-full relative transition-all duration-100 ${
                  dark
                    ? "bg-gradient-to-r from-[#d4af37] to-[#f5d77f]"
                    : "bg-gradient-to-r from-[#5b2c1d] to-[#8c432d]"
                }`}
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono font-medium">
              <span className={dark ? "text-white/60" : "text-gray-500"}>{formatTime(currentTime)}</span>
              <div className="flex items-center gap-3">
                {/* 15s Skip Buttons */}
                <button
                  onClick={() => handleSkip(-15)}
                  title="Retroceder 15 segundos"
                  className={`hover:opacity-100 opacity-60 transition-opacity cursor-pointer flex items-center gap-0.5 ${
                    dark ? "text-white" : "text-gray-700"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                    />
                  </svg>
                  <span>15s</span>
                </button>
                <button
                  onClick={() => handleSkip(15)}
                  title="Adelantar 15 segundos"
                  className={`hover:opacity-100 opacity-60 transition-opacity cursor-pointer flex items-center gap-0.5 ${
                    dark ? "text-white" : "text-gray-700"
                  }`}
                >
                  <span>15s</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                    />
                  </svg>
                </button>
                <span className={dark ? "text-white/60" : "text-gray-500"}>
                  {formatRemainingTime(currentTime, duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // HERO STAGE VARIANT (APPLE PODCASTS FLAGSHIP PLAYER)
  // ==========================================
  return (
    <div className={`w-full flex items-center justify-center p-3 sm:p-6 lg:p-8 ${className}`}>
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          if (onEnded) onEnded();
        }}
      />

      <div
        className={`w-full max-w-3xl rounded-3xl sm:rounded-[36px] relative overflow-hidden transition-all duration-300 border shadow-[0_30px_70px_rgba(0,0,0,0.5)] ${
          dark
            ? "bg-gradient-to-b from-[#18181f] via-[#121217] to-[#0a0a0c] border-white/10 text-white"
            : "bg-gradient-to-b from-[#ffffff] via-[#faf8f5] to-[#f4f0e8] border-black/[0.08] text-gray-900 shadow-[0_30px_70px_rgba(91,44,29,0.12)]"
        }`}
      >
        {/* Ambient Backlight Glow Matching Theme */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-56 rounded-full pointer-events-none blur-[100px] opacity-40 transition-opacity duration-700 ${
            isPlaying ? "opacity-70 scale-110" : "opacity-30"
          } ${dark ? "bg-[#d4af37]/30" : "bg-[#5b2c1d]/20"}`}
        />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col items-center text-center">
          {/* Album / Class Squircle Artwork */}
          <div className="relative group mb-6 sm:mb-8">
            <div
              className={`w-44 h-44 sm:w-56 sm:h-56 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl relative border transition-transform duration-500 ${
                isPlaying ? "scale-105" : "scale-100"
              } ${dark ? "border-white/15 bg-black/60 shadow-[0_20px_40px_rgba(0,0,0,0.8)]" : "border-black/10 bg-white shadow-[0_20px_40px_rgba(91,44,29,0.15)]"}`}
            >
              {coverImage ? (
                <Image src={coverImage} alt={title} fill className="object-cover" priority unoptimized />
              ) : (
                <div
                  className={`w-full h-full flex flex-col items-center justify-center p-6 ${
                    dark ? "bg-gradient-to-br from-[#2a2a35] to-[#121217] text-[#d4af37]" : "bg-gradient-to-br from-[#f8f5ee] to-[#e8decb] text-[#5b2c1d]"
                  }`}
                >
                  <svg className="w-16 h-16 mb-2 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Audio Clase</span>
                </div>
              )}

              {/* Live Waveform Overlay when playing */}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center gap-1.5 px-6">
                  {[40, 75, 50, 95, 60, 85, 45, 90, 65, 80, 50, 70].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-[#d4af37] to-white rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDuration: `${0.6 + (i % 5) * 0.15}s`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="max-w-xl w-full mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-1.5 px-4 break-words">
              {title}
            </h2>
            {subtitle && (
              <p className={`text-xs sm:text-sm font-medium ${dark ? "text-white/60" : "text-gray-600"}`}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Progress / Scrubber Bar */}
          <div className="w-full max-w-lg mb-6 sm:mb-8 space-y-2">
            <div
              ref={progressBarRef}
              onClick={handleSeek}
              className={`h-2 sm:h-2.5 rounded-full cursor-pointer transition-all relative group/seek ${
                dark ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/15"
              }`}
            >
              <div
                className={`h-full rounded-full relative transition-all duration-100 ${
                  dark
                    ? "bg-gradient-to-r from-[#d4af37] to-[#fce49b]"
                    : "bg-gradient-to-r from-[#5b2c1d] to-[#8c432d]"
                }`}
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/seek:scale-100 transition-transform" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono font-medium tracking-tight">
              <span className={dark ? "text-white/50" : "text-gray-500"}>{formatTime(currentTime)}</span>
              <span className={dark ? "text-white/50" : "text-gray-500"}>
                {formatRemainingTime(currentTime, duration)}
              </span>
            </div>
          </div>

          {/* Main Controls Row: Speed, Jump-15, PLAY/PAUSE, Jump+15, Download */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-8">
            {/* Speed Button (1x, 1.25x, etc.) */}
            <button
              onClick={handleSpeedChange}
              title={`Velocidad: ${currentSpeed}x`}
              className={`px-3 py-1.5 rounded-full text-xs font-bold font-mono tracking-tight transition-all cursor-pointer border ${
                dark
                  ? "bg-white/[0.06] text-white/80 border-white/10 hover:bg-white/[0.12] hover:text-white"
                  : "bg-black/[0.04] text-gray-700 border-black/10 hover:bg-black/[0.08]"
              }`}
            >
              {currentSpeed}x
            </button>

            {/* Apple 15s Back Button */}
            <button
              onClick={() => handleSkip(-15)}
              title="Retroceder 15 segundos"
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer border ${
                dark
                  ? "bg-white/[0.05] border-white/10 text-white/80 hover:bg-white/[0.1] hover:text-white"
                  : "bg-black/[0.03] border-black/[0.08] text-gray-700 hover:bg-black/[0.06]"
              }`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                {/* Counter clockwise circular arrow with 15 text */}
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
              </svg>
              <span className="text-[9px] font-bold font-mono -mt-0.5">15</span>
            </button>

            {/* Main Play / Pause Button */}
            <button
              onClick={togglePlay}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform active:scale-95 cursor-pointer ${
                dark
                  ? "bg-gradient-to-tr from-[#d4af37] to-[#fce49b] text-black hover:scale-105 shadow-[#d4af37]/20"
                  : "bg-gradient-to-tr from-[#5b2c1d] to-[#7d3c28] text-white hover:scale-105 shadow-[#5b2c1d]/30"
              }`}
            >
              {isBuffering ? (
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-3 border-current border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-7 h-7 sm:w-9 sm:h-9 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Apple 15s Forward Button */}
            <button
              onClick={() => handleSkip(15)}
              title="Adelantar 15 segundos"
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer border ${
                dark
                  ? "bg-white/[0.05] border-white/10 text-white/80 hover:bg-white/[0.1] hover:text-white"
                  : "bg-black/[0.03] border-black/[0.08] text-gray-700 hover:bg-black/[0.06]"
              }`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                {/* Clockwise circular arrow with 15 text */}
                <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
              </svg>
              <span className="text-[9px] font-bold font-mono -mt-0.5">15</span>
            </button>

            {/* Download Audio File Button */}
            <a
              href={audioUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              title="Descargar audio para escuchar sin conexión"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                dark
                  ? "bg-white/[0.05] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.1]"
                  : "bg-black/[0.03] border-black/[0.08] text-gray-600 hover:text-gray-900 hover:bg-black/[0.06]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>

          {/* Bottom Volume Slider */}
          <div className="flex items-center gap-3 w-full max-w-xs justify-center pt-2">
            <button
              onClick={toggleMute}
              className={`transition-colors cursor-pointer ${dark ? "text-white/60 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
            >
              {isMuted || volume === 0 ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className={`w-32 sm:w-40 h-1.5 rounded-lg cursor-pointer transition-all ${
                dark ? "accent-[#d4af37] bg-white/20" : "accent-[#5b2c1d] bg-black/10"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
