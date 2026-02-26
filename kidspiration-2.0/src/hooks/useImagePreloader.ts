import { useState, useEffect } from "react";

export function useImagePreloader(
  urls: string[],
  maxWaitMs: number = 8000,
): boolean {
  const [loaded, setLoaded] = useState(urls.length === 0);

  useEffect(() => {
    if (urls.length === 0) {
      setLoaded(true);
      return;
    }

    let settled = false;
    let count = 0;

    const done = () => {
      if (!settled) {
        settled = true;
        setLoaded(true);
      }
    };

    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = img.onerror = () => {
        count++;
        if (count >= urls.length) done();
      };
    });

    // Safety timeout — don't block the UI forever if images are slow
    const timer = setTimeout(done, maxWaitMs);

    return () => {
      settled = true;
      clearTimeout(timer);
    };
  }, [urls, maxWaitMs]);

  return loaded;
}
