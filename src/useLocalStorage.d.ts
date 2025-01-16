import "react-use";

declare module "react-use" {
  import { Dispatch, SetStateAction } from "react";
  export declare function useLocalStorage<T>(
    key: string,
    initialValue: T,
    options?:
      | {
          raw: true;
        }
      | {
          raw: false;
          serializer: (value: T) => string;
          deserializer: (value: string) => T;
        }
      | undefined,
  ): [T, Dispatch<SetStateAction<T | undefined>>, () => void];
  export declare function useLocalStorage<T>(
    key: string,
    initialValue?: T | undefined,
    options?:
      | {
          raw: true;
        }
      | {
          raw: false;
          serializer: (value: T) => string;
          deserializer: (value: string) => T;
        }
      | undefined,
  ): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void];
}
