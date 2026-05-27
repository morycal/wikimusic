"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { login, register, user, logout } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-white">
          {user.name}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl w-80">
      <h2 className="text-2xl font-bold mb-5 text-white">
        {isLogin ? "Login" : "Register"}
      </h2>

      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-3 rounded-xl bg-black/30 text-white outline-none"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 rounded-xl bg-black/30 text-white outline-none"
      />

      <button
        onClick={() => {
          if (isLogin) {
            login(email);
          } else {
            register(name, email);
          }
        }}
        className="w-full bg-purple-600 hover:bg-purple-500 p-3 rounded-xl font-bold"
      >
        {isLogin ? "Login" : "Create Account"}
      </button>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-sm text-zinc-400 hover:text-white"
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}