"use client";

import { usePreserveScrollPosition } from "@/utils/usePreserveScrollPosition";
import { emitter, GameEvent } from "@/utils/emitter";
import { useEffect } from "react";

export default function ClientScrollContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrollContainerRef = usePreserveScrollPosition(ClientScrollContainer);

  useEffect(() => {
    const handler = () => {
      scrollContainerRef.current?.scrollTo({ top: 0 });
    };
    return emitter.on(GameEvent.SolutionCheckSucceeded, handler);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="flex h-full w-full flex-auto flex-col justify-between overflow-y-auto overflow-x-hidden"
    >
      {children}
    </div>
  );
}
