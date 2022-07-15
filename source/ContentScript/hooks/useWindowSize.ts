import { useEffect, useState } from "react"
import { Coord } from "../../types/Coord"

export const useWindowSize = () => {
  const [size, setSize] = useState<Coord>({ x: window.innerWidth, y: window.innerHeight });
  const onResize = () => {
    setSize({ x: window.innerWidth, y: window.innerHeight });
  };
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);
  return size;
};
