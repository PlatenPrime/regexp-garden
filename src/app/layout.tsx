import type { Metadata } from "next";
import "./globals.css";
import { YandexMetrika } from "@/components/YandexMetrika.tsx";
import { GoogleTagManager } from "@/components/GoogleTagManager.tsx";

export const metadata: Metadata = {
  title: "Regexp Garden",
  description: "Learn regexp interactively and with fun by playing game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-ds-primaryFill  h-screen w-screen antialiased overflow-y-hidden">
        <GoogleTagManager />
        <YandexMetrika />
        <main className="h-full w-full min-w-[768px] overflow-x-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
