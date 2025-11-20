import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { StoreInitializer } from "@/components/StoreInitializer";

export const metadata: Metadata = {
  title: "Cine-Track Pro",
  description: "Cinema Production Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-black text-zinc-100 flex h-screen overflow-hidden selection:bg-indigo-500/30"
        suppressHydrationWarning
      >
        <StoreInitializer />
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Global Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/5 via-transparent to-purple-900/5 pointer-events-none z-0" />
          <div className="relative z-10 h-full flex flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
