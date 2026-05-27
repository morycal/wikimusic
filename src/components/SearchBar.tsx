"use client";

import { useState } from "react";
import { songs } from "@/data/songs";
import SongCard from "./SongCard";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Input */}
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6 p-3 rounded-xl bg-white/10 text-white outline-none border border-white/10 focus:border-purple-500"
      />

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))
        ) : (
          <p className="text-zinc-400">No songs found 😢</p>
        )}
      </div>
    </div>
  );
}