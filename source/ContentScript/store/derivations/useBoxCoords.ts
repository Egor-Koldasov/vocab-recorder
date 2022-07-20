import { useScrollBottom } from "../../hooks/useScrollBottom";
import { useWindowScroll } from "../../hooks/useWindowScroll";
import { useWindowSize } from "../../hooks/useWindowSize";
import { boxHeight, boxWidth } from "../../../settings/box";
import { addCoords } from "../../util/addCoords";
import { subtractCoords } from "../../util/subtractCoords";
import { State } from "../types/Store";
import { useStoreState, useStoreStateSelector } from "../useStore";

export const useBoxAutoCoords = () => {
  const scrollBottom = useScrollBottom();
  const windowScroll = useWindowScroll();
  const windowSize = useWindowSize();
  const maxX = windowSize.x - boxWidth;
  const { openBox } = useStoreState();
  if (!openBox) return { x: 0, y: 0 };
  const centerCoords = addCoords(windowScroll, openBox.point.cursor);
  const xShifted = centerCoords.x - (boxWidth / 2);
  return {
    y: Math.min(scrollBottom - boxHeight, centerCoords.y + 15),
    x: Math.max(0, Math.min(xShifted, maxX)),
  };
}

export const getDraggingShift = (state: State) => {
  const drag = state.openBox?.drag;
  const cursor = state.cursor;
  if (drag?.active && cursor && drag.mouseInBoxPos) {
    return subtractCoords(cursor, drag.mouseInBoxPos);
  }
  return { x: 0, y: 0 };
}

export const useBoxCoords = () => {
  const autoCoords = useBoxAutoCoords();
  const draggingShift = useStoreStateSelector(getDraggingShift);
  const drag = useStoreStateSelector((state) => state.openBox?.drag);
  if (drag?.active) {
    return draggingShift;
  }
  if (!drag?.active && drag?.movedPos) {
    return drag.movedPos;
  }
  return autoCoords;
}
