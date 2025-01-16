import { emitter, GameEvent } from "@/utils/emitter";
import { useEffect, useState } from "react";

export const useRiseFlagForSomeTimeOnEvent = (
  event: GameEvent,
  ms: number,
): boolean => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const unsub = emitter.on(event, () => {
      setValue(true);
    });
    return () => unsub();
  }, [event, ms]);

  useEffect(() => {
    if (value) {
      setTimeout(() => setValue(false), ms);
    }
  }, [value]);

  return value;
};
