import { useScrollBottom } from "../../hooks/useScrollBottom";
import { wholeBoxHeight } from "../../settings/box";
import { addCoords } from "../../util/addCoords";
import { useStoreState } from "../useStore";

export const useBoxAutoCoords = () => {
  const scrollBottom = useScrollBottom();
  const { openBox } = useStoreState();
  if (!openBox) return { x: 0, y: 0 };
  const rawCoords = addCoords(openBox.point.windowScroll, openBox.point.cursor);
  return {
    y: Math.min(scrollBottom - wholeBoxHeight, rawCoords.y + 15),
    x: rawCoords.x
  };
}