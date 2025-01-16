"use client";

import { useEffect } from "react";
import { METRIKA_ID } from "@/utils/yandexMetrika.ts";

export const YandexMetrika = () => {
  useEffect(() => {
    // Проверка, что метрика еще не инициализирована
    if (typeof window !== "undefined" && !(window as any).ym) {
      (function (m, e, t, r, i, k, a) {
        // @ts-expect-error yandex metrica
        m[i] =
          // @ts-expect-error yandex metrica
          m[i] ||
          function () {
            // @ts-expect-error yandex metrica
            // eslint-disable-next-line
            (m[i].a = m[i].a || []).push(arguments);
          };
        // @ts-expect-error yandex metrica
        m[i].l = 1 * new Date();
        // eslint-disable-next-line
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return;
          }
        }
        // @ts-expect-error yandex metrica
        (k = e.createElement(t)),
          // @ts-expect-error yandex metrica
          (a = e.getElementsByTagName(t)[0]),
          // @ts-expect-error yandex metrica
          (k.async = 1),
          // @ts-expect-error yandex metrica
          (k.src = r),
          // @ts-expect-error yandex metrica
          a.parentNode.insertBefore(k, a);
      })(
        window,
        document,
        "script",
        "https://mc.yandex.ru/metrika/tag.js",
        "ym",
      );

      window.ym(METRIKA_ID, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    }
  }, []);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
};
