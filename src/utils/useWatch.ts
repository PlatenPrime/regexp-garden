import { useEffect, useRef } from "react";

export type StopWatching = () => void;
export type Destructor = () => void;

export type UseWatch<T> = (
  value: T,
  cb: (prev: T | void, next: T) => void | Destructor,
  params?: { immediate?: boolean },
) => StopWatching;

export const useWatch = <T>(): UseWatch<T> => {
  return function useInner(
    value: T,
    cb: (prev: T | void, next: T) => void,
    { immediate }: { immediate?: boolean } = { immediate: false },
  ): StopWatching {
    const prev = useRef<T>(value);

    if (immediate) {
      cb(prev.current, value);
    }

    const isFinished = useRef(false);

    useEffect(() => {
      if (isFinished.current) {
        return;
      }

      if (value !== prev.current) {
        const destructor = cb(prev.current, value);
        prev.current = value;

        return destructor;
      }
    }, [value]);

    return () => {
      isFinished.current = true;
    };
  };
};
