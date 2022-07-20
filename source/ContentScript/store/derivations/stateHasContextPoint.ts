import { State, StateWithContextPoint } from "../types/Store";

export const stateHasContextPoint = (state: State): state is StateWithContextPoint => {
  return state.contextMenuWord !== null;
};
