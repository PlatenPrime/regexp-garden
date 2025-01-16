export const GTM_ID = "GTM-K5KQXQFP";
export const GA_ID = "G-VRKZ56YL90";

import ReactGA from "react-ga4";
import {LogEventPayload} from "@/utils/logging.ts";

// Инициализация Google Analytics
export const initGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

// Отслеживание просмотра страницы
export const logPageViewGA = (url: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: url,
  });
};

export const logEventGA = (eventName: string, params: LogEventPayload) => {
  ReactGA.event(eventName, params);
};
