"use client";

import { createContext, useContext, useState } from "react";

type PlaylistContextType = {
  playlist: any[];
  addToPlaylist: (song: any) => void;
  removeFromPlaylist: (id: number) => void;
};

const PlaylistContext = createContext<PlaylistContextType | null>(null);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [playlist, setPlaylist] = useState<any[]>([]);

  const addToPlaylist = (song: any) => {
    setPlaylist((prev) => {
      const exists = prev.find((s) => s.id === song.id);
      if (exists) return prev;
      return [...prev, song];
    });
  };

  const removeFromPlaylist = (id: number) => {
    setPlaylist((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <PlaylistContext.Provider
      value={{ playlist, addToPlaylist, removeFromPlaylist }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const ctx = useContext(PlaylistContext);
  if (!ctx) throw new Error("usePlaylist must be used inside PlaylistProvider");
  return ctx;
}