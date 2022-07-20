import { useEffect, useState } from "react"
import { Coord } from "../../types/Coord"

export const getWindowScroll = () => {
  return { x: window.scrollX, y: window.scrollY };
}
export const useWindowScroll = () => {
  const [scroll, setScroll] = useState<Coord>(getWindowScroll());
  const onScroll = () => {
    setScroll(getWindowScroll());
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  return scroll;
};
