import { makeAutoObservable } from "mobx";

export type StringRef = { value: string };
export const createLocalStorageRef = (
  key: string,
  params?: { defaultValue?: string; shouldUseSessionStorage?: boolean },
): StringRef => {
  const paramsUse = Object.assign(
    {
      defaultValue: "",
      shouldUseSessionStorage: false,
    },
    params ?? {},
  );
  const getSet = {
    get value(): string {
      return state.value;
    },
    set value(value: string) {
      if (typeof window === "undefined") {
        return;
      }
      if (paramsUse.shouldUseSessionStorage) {
        sessionStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, value);
      }

      state.value = value;
    },
  };

  let value: string;

  if (typeof window === "undefined") {
    value = "";
  } else {
    value =
      (paramsUse.shouldUseSessionStorage
        ? sessionStorage
        : localStorage
      ).getItem(key) ?? paramsUse.defaultValue;
  }

  const state = { value };

  makeAutoObservable(state);

  return getSet;
};
