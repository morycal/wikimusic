"use client";

import { useEffect, useRef, useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Player() {
  const { currentSong } = usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // وقتی آهنگ تغییر کرد
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    audioRef.current.src = currentSong.audio;
    audioRef.current.play();
    setIsPlaying(true);
  }, [currentSong]);

  // Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // آپدیت زمان
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;

    setCurrentTime(current);
    setDuration(total);

    setProgress((current / total) * 100);
  };

  // seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const value = Number(e.target.value);
    audioRef.current.currentTime = (value / 100) * duration;
    setProgress(value);
  };

  // volume
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const value = Number(e.target.value);
    audioRef.current.volume = value;
    setVolume(value);
  };

  // فرمت زمان
  const formatTime = (time: number) => {
    if (!time) return "00:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ y: 120 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 w-full bg-black/70 backdrop-blur-2xl border-t border-white/10 p-4 flex items-center gap-4 text-white"
    >
      {/* Song info */}
      <div className="w-1/4">
        <h3 className="font-bold">{currentSong.title}</h3>
        <p className="text-sm text-zinc-400">{currentSong.artist}</p>
      </div>

      {/* center controls */}
      <div className="flex-1 flex flex-col items-center gap-2">
        {/* play button */}
        <button
          onClick={togglePlay}
          className="bg-purple-600 hover:bg-purple-500 p-3 rounded-full shadow-lg shadow-purple-500/30"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* progress */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-zinc-400 w-10">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            value={progress}
            onChange={handleSeek}
            className="w-full accent-purple-500 cursor-pointer"
          />

          <span className="text-xs text-zinc-400 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* volume */}
      <div className="w-1/4 flex items-center justify-end gap-2">
        <FaVolumeUp />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="w-24 accent-purple-500 cursor-pointer"
        />
      </div>

      {/* audio */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />
    </motion.div>
  );
}