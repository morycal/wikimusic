"use client";

import { usePlayer } from "@/context/PlayerContext";
import { useLike } from "@/context/LikeContext";
import { usePlaylist } from "@/context/PlaylistContext";

import { FaHeart, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SongCard({ song }: any) {
  const { setCurrentSong } = usePlayer();

  const { toggleLike, isLiked } = useLike();
  const { addToPlaylist } = usePlaylist();

  const liked = isLiked(song.id);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-4 rounded-2xl cursor-pointer backdrop-blur-xl hover:shadow-purple-500/30 transition relative overflow-hidden"
    >
      {/* Like Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(song.id);
        }}
        className="absolute top-3 right-3 z-10 text-xl"
      >
        <FaHeart
          className={`transition ${
            liked ? "text-red-500" : "text-white/40"
          }`}
        />
      </button>

      {/* Playlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToPlaylist(song);
        }}
        className="absolute bottom-3 right-3 z-10 text-lg text-white/50 hover:text-purple-400 transition"
      >
        <FaPlus />
      </button>

      {/* Song Content */}
      <div onClick={() => setCurrentSong(song)}>
        <div className="relative">
          <img
            src="https://picsum.photos/300"
            alt={song.title}
            className="rounded-xl mb-3 w-full"
          />

          {/* Glow Overlay */}
          <div className="absolute inset-0 bg-purple-500/10 rounded-xl"></div>
        </div>

        <h3 className="font-bold text-lg text-white">
          {song.title}
        </h3>

        <p className="text-zinc-400 text-sm">
          {song.artist}
        </p>
      </div>
    </motion.div>
  );
}