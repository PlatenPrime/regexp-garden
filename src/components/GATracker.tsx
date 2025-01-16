"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_ID, initGA, logPageViewGA } from "@/utils/ga.ts";

export default function GATracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Инициализируем Google Analytics
    initGA(GA_ID); // Замените на ваш Measurement ID
  }, []);

  useEffect(() => {
    // Отслеживаем изменения маршрутов
    const url =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    logPageViewGA(url);
  }, [pathname, searchParams]);

  return null; // Этот компонент не рендерит ничего на странице
}
