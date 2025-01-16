"use client";

import { useEffect } from "react";
import { GTM_ID } from "@/utils/ga.ts";

export const GoogleTagManager = () => {
  useEffect(() => {
    // Проверка, что метрика еще не инициализирована
    if (typeof window !== "undefined" && !(window as any).ym) {
      (function (w, d, s, l, i) {
        // @ts-expect-error gtm
        w[l] = w[l] || [];
        // @ts-expect-error gtm
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        // eslint-disable-next-line
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        // @ts-expect-error gtm
        j.async = true;
        // @ts-expect-error gtm
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        // @ts-expect-error gtm
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", GTM_ID);
    }
  }, []);

  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-K5KQXQFP"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
    </>
  );
};
