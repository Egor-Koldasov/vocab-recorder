import { State, StateWithCursorPoint } from "../types/Store";

export const stateHasCursorPoint = (state: State): state is StateWithCursorPoint => {
  return state.cursorPoint !== null;
};
