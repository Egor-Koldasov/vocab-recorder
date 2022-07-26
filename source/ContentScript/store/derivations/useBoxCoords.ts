import { useWindowSize } from "../../hooks/useWindowSize";
import { boxHeight, boxWidth } from "../../../settings/box";
import { subtractCoords } from "../../util/subtractCoords";
import { State } from "../types/Store";
import { useStoreState, useStoreStateSelector } from "../useStore";
import { Coord } from "../../../types/Coord";


const fixedCoordsToBox = (coord: Coord): Coord => coord;

export const useBoxAutoCoords = () => {
  const windowSize = useWindowSize();
  const maxCoords = fixedCoordsToBox({
    x: windowSize.x - boxWidth,
    y: windowSize.y - boxHeight,
  });
  const { openBox } = useStoreState();
  if (!openBox) return { x: 0, y: 0 };
  // const centerCoords = fixedCoordsToBox(openBox.point.cursor);
  // const xShifted = centerCoords.x - (boxWidth / 2);
  return maxCoords;
}

export const getDraggingShift = (state: State) => {
  const drag = state.openBox?.drag;
  const cursor = state.cursor;
  if (drag?.active && cursor && drag.mouseInBoxPos) {
    return subtractCoords(fixedCoordsToBox(cursor), drag.mouseInBoxPos);
  }
  return { x: 0, y: 0 };
}

export const useBoxCoords = (): Coord => {
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
