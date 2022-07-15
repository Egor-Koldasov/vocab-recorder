import { PartialDeep } from "type-fest";
import { PartialState } from "zustand";
import { PointedWord } from "../../types/PointedWord";

export type State = {
  cursorPoint: PointedWord | null,
  selectedPoint: PointedWord | null,
}
export type Store = {
  state: State,
  actions: {
    update: (update: PartialDeep<State>) => void,
  }
}