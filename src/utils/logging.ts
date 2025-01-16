import { emitter, GameEvent } from "@/utils/emitter.ts";
import { logEventYM, logGoalYM } from "@/utils/yandexMetrika.ts";
import { logEventGA } from "@/utils/ga.ts";

export type LogEventPayload = {
  levelTitle: string;
  levelNumber: number;
  possibleSolution: string;
  attemptedSolution?: string;
  validationError?: string;
};

export const logEvent = (action: string, payload: LogEventPayload): void => {
  logEventYM(action, payload);
  logEventGA(action, payload);
};

emitter.on(GameEvent.SolutionSubmitted, (_, logPayload) => {
  logEvent("SolutionSubmitted", logPayload);
});

emitter.on(GameEvent.SolutionCheckFailed, (_, _1, logPayload) => {
  logEvent("SolutionCheckFailed", logPayload);
});

emitter.on(
  GameEvent.SolutionValidationFailed,
  (_, validationError, logPayload) => {
    logEvent("SolutionValidationFailed", {
      ...logPayload,
      validationError: validationError as string,
    });
  },
);

emitter.on(GameEvent.SolutionCheckSucceeded, (_, _1, logPayload) => {
  logEvent("SolutionCheckSucceeded", logPayload);
  logGoalYM("SolutionCheckSucceeded", logPayload);
});
