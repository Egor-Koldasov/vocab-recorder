import { GetState } from "zustand";
import { MergeState } from "zustand-ready";
import { Coord } from "../../../types/Coord";
import { PointedWord } from "../../../types/PointedWord";
import { getMutations } from "../getMutations";
import { OpenBox } from "./OpenBox";

export type State = {
  cursor: Coord | null,
  cursorPoint: PointedWord | null,
  openBox: OpenBox | null,
}
export type Mutations = ReturnType<typeof getMutations>
export type Store = {
  state: State,
  mutations: Mutations,
}
export type StateWithCursorPoint = State & {
  cursorPoint: PointedWord,
}

export type Get = GetState<Store>
export type Merge = MergeState<Store>
export type Context = { get: Get, merge: Merge };
