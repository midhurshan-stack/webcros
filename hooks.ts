import { useEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const on = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return size;
}
