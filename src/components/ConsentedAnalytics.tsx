"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const STORAGE_KEY = "sp-cookie-consent-v1";

export default function ConsentedAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    function read() {
      try {
        setAllowed(localStorage.getItem(STORAGE_KEY) === "accepted");
      } catch {
        setAllowed(false);
      }
    }
    read();
    window.addEventListener("storage", read);
    window.addEventListener("sp-consent-change", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("sp-consent-change", read);
    };
  }, []);

  if (!allowed) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
