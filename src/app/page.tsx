import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-6 pb-24 text-white">
        <Navbar />

        <h2 className="text-2xl font-bold mb-6">
          Search Music
        </h2>

        <SearchBar />

        <Player />
      </section>
    </main>
  );
}