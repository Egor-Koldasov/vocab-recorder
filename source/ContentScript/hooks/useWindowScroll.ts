import { useEffect, useState } from "react"
import { Coord } from "../../types/Coord"

export const useWindowScroll = () => {
  const [scroll, setScroll] = useState<Coord>({ x: window.scrollX, y: window.scrollY });
  const onScroll = () => {
    setScroll({ x: window.scrollX, y: window.scrollY });
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  return scroll;
};
