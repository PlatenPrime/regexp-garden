import { useEffect } from "react";

export const useOnce = (cb: (...args: any[]) => any): void => {
  useEffect(() => {
    return cb();
  }, []);
};
