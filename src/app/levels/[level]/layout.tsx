"use client";
import { Header } from "@/components/Header/Header/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { usePreserveScrollPosition } from "@/utils/usePreserveScrollPosition.ts";
import { emitter, GameEvent } from "@/utils/emitter.ts";
import { useEffect } from "react";
import GATracker from "@/components/GATracker.tsx";

export default function LevelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrollContainerRef = usePreserveScrollPosition(LevelLayout);

  useEffect(() => {
    return emitter.on(GameEvent.SolutionCheckSucceeded, () => {
      scrollContainerRef.current?.scrollTo({ top: 0 });
    });
  }, []);

  return (
    <>
      <GATracker />
      <div className="flex h-full w-full flex-auto justify-between">
        <div
          ref={scrollContainerRef}
          className="flex h-full w-full flex-auto flex-col justify-between overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-5">
            <Header />
            {children}
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}
