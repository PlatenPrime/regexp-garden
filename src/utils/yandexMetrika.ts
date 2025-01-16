// utils/yandexMetrika.ts
import { LogEventPayload } from "@/utils/logging.ts";

export const METRIKA_ID = 99526408;

declare global {
  interface Window {
    ym: {
      (
        id: number | string,
        method: "hit" | "reachGoal",
        target: string,
        params?: Record<string, any>,
      ): void;
      (id: number | string, method: "init", params?: Record<string, any>): void;
    };
  }
}

/**
 * Логгирование цели в Яндекс.Метрике
 * @param target - Название цели
 * @param params - Дополнительные параметры
 */
export const logGoalYM = (target: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.ym) {
    window.ym(METRIKA_ID, "reachGoal", target, params);
  } else {
    console.warn("Яндекс.Метрика не инициализирована");
  }
};

/**
 * Логгирование события с дополнительными параметрами
 * @param options - Опции события
 */
export const logEventYM = (action: string, options: LogEventPayload) => {
  if (typeof window !== "undefined" && window.ym) {
    window.ym(METRIKA_ID, "reachGoal", action, options);
  } else {
    console.warn("Яндекс.Метрика не инициализирована");
  }
};
