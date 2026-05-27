"use client";

import { createContext, useContext, useState } from "react";

type LikeContextType = {
  likedSongs: number[];
  toggleLike: (id: number) => void;
  isLiked: (id: number) => boolean;
};

const LikeContext = createContext<LikeContextType | null>(null);

export function LikeProvider({ children }: { children: React.ReactNode }) {
  const [likedSongs, setLikedSongs] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedSongs((prev) =>
      prev.includes(id)
        ? prev.filter((songId) => songId !== id)
        : [...prev, id]
    );
  };

  const isLiked = (id: number) => likedSongs.includes(id);

  return (
    <LikeContext.Provider value={{ likedSongs, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
}

export function useLike() {
  const ctx = useContext(LikeContext);
  if (!ctx) throw new Error("useLike must be used inside LikeProvider");
  return ctx;
}