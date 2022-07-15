import { useMemo } from "react";
import { useWindowScroll } from "./useWindowScroll";
import { useWindowSize } from "./useWindowSize"

export const useScrollBottom = () => {
  const size = useWindowSize();
  const scroll = useWindowScroll();
  return useMemo(() => {
    const scrollBot = scroll.y + size.y;
    console.log('scrollBot', scrollBot, scroll.y, size.y);
    return scrollBot;
  }, [size, scroll]);
};
