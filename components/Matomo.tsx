"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    _paq?: any[][];
  }
}

export default function Matomo() {
  const pathname = usePathname();

  // Verificar si estamos en localhost
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "0.0.0.0");

  useEffect(() => {
    if (!isLocalhost && typeof window !== "undefined" && window._paq) {
      window._paq.push(["trackPageView"]);
    }
  }, [pathname, isLocalhost]);

  // No cargar Matomo en localhost
  if (isLocalhost) {
    return null;
  }

  return (
    <>
      <Script
        id="matomo-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://analytics.code4ce.com/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `,
        }}
      />
    </>
  );
}

