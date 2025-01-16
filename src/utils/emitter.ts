import { createNanoEvents } from "nanoevents";
import { ValidationError } from "@/game/LevelClasses/validators.tsx";

import { LogEventPayload } from "@/utils/logging.ts";

export enum GameEvent {
  SolutionSubmitted,
  SolutionValidationFailed,
  SolutionCheckFailed,
  SolutionCheckSucceeded,
  SuccessAnimationEnded,
}

export type RegexpGardenEvents = {
  [GameEvent.SolutionSubmitted]: (
    solution: string,
    logPayload: LogEventPayload,
  ) => void;
  [GameEvent.SolutionValidationFailed]: (
    solution: string,
    validationError: ValidationError,
    logPayload: LogEventPayload,
  ) => void;
  //что полили?
  [GameEvent.SolutionCheckFailed]: (
    solution: string,
    plantLabels: string[],
    logPayload: LogEventPayload,
  ) => void;
  //показать что полили, показать замену
  [GameEvent.SolutionCheckSucceeded]: (
    solution: string,
    plantLabels: string[],
    logPayload: LogEventPayload,
  ) => void;
  [GameEvent.SuccessAnimationEnded]: () => void;
};

export const emitter = createNanoEvents<RegexpGardenEvents>();
