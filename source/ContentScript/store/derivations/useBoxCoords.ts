import { useScrollBottom } from "../../hooks/useScrollBottom";
import { useWindowScroll } from "../../hooks/useWindowScroll";
import { wholeBoxHeight } from "../../settings/box";
import { addCoords } from "../../util/addCoords";
import { subtractCoords } from "../../util/subtractCoords";
import { State } from "../types/Store";
import { useStoreState, useStoreStateSelector } from "../useStore";

export const useBoxAutoCoords = () => {
  const scrollBottom = useScrollBottom();
  const windowScroll = useWindowScroll();
  const { openBox } = useStoreState();
  if (!openBox) return { x: 0, y: 0 };
  const rawCoords = addCoords(windowScroll, openBox.point.cursor);
  return {
    y: Math.min(scrollBottom - wholeBoxHeight, rawCoords.y + 15),
    x: rawCoords.x
  };
}

export const getDraggingShift = (state: State) => {
  const drag = state.openBox?.drag;
  const cursor = state.cursor;
  if (drag?.active && cursor && drag.dragStartPos) {
    return subtractCoords(drag.dragStartPos, cursor);
  };
  return { x: 0, y: 0 };
}

export const useBoxCoords = () => {
  const autoCoords = useBoxAutoCoords();
  const draggingShift = useStoreStateSelector(getDraggingShift);
  const drag = useStoreStateSelector((state) => state.openBox?.drag);
  if (drag?.active) {
    return subtractCoords(autoCoords, draggingShift);
  };
  if (!drag?.active && drag?.shift) {
    return subtractCoords(autoCoords, drag.shift);
  }
  return autoCoords;
}
