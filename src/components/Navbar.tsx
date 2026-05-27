import AuthModal from "./AuthModal";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between mb-10">
      <div>
        <h2 className="text-3xl font-bold text-white">
          Discover Music
        </h2>

        <p className="text-zinc-400">
          بهترین آهنگ‌ها را گوش کن
        </p>
      </div>

      <AuthModal />
    </header>
  );
}