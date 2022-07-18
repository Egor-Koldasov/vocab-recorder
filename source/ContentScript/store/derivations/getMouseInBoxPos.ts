import { Coord } from "../../../types/Coord";
import { subtractCoords } from "../../util/subtractCoords";
import { State } from "../types/Store"

export const getMouseInBoxPos = (state: State, event: MouseEvent) => {
  const box = state.openBox?.ref && state.openBox?.ref();
  if (!box || !box.current) return { x: 0, y: 0 };
  const rect = box.current.getBoundingClientRect();
  const cursorCoord: Coord = { x: event.clientX, y: event.clientY };
  console.log('mouse in box', subtractCoords(cursorCoord, rect), cursorCoord, rect);
  return subtractCoords(cursorCoord, rect);
}