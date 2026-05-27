import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { LikeProvider } from "@/context/LikeContext";
import { PlaylistProvider } from "@/context/PlaylistContext";

export const metadata = {
  title: "MusicX",
  description: "Modern Music Streaming App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PlayerProvider>
            <LikeProvider>
              <PlaylistProvider>
                {children}
              </PlaylistProvider>
            </LikeProvider>
          </PlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}