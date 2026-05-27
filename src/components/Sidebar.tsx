"use client";

import { FaHome, FaSearch, FaMusic } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen p-6 hidden md:flex flex-col bg-white/5 backdrop-blur-2xl border-r border-white/10">
      <h1 className="text-4xl font-extrabold mb-10 text-purple-400">
        MusicX
      </h1>

      <nav className="space-y-5 text-sm">
        {[
          { icon: <FaHome />, name: "Home" },
          { icon: <FaSearch />, name: "Search" },
          { icon: <FaMusic />, name: "Library" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 8, scale: 1.05 }}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 cursor-pointer transition"
          >
            <span className="text-purple-400">{item.icon}</span>
            <span>{item.name}</span>
          </motion.div>
        ))}
      </nav>
    </aside>
  );
}