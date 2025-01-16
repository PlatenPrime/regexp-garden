import { FunctionComponent, useEffect, useLayoutEffect, useRef } from "react";

export const usePreserveScrollPosition = (key: FunctionComponent<any>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    const handleScroll = () => {
      sessionStorage.setItem(
        `%%preserveScrollPosition-${key.name}`,
        String(target.scrollTop),
      );
    };

    target.addEventListener("scroll", handleScroll);

    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (ref.current) {
      const scrollPosition = parseFloat(
        sessionStorage.getItem(`%%preserveScrollPosition-${key.name}`) ?? "0",
      );
      ref.current.scrollTo(0, scrollPosition);
    }
  });

  return ref;
};
