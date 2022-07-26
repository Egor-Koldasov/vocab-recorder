import { Path } from "dot-get-ts";
import { PartialDeepKeepNullUnion } from "partial-deep-keep-union/dist/PartialDeepKeepUnion";
import { GetState } from "zustand";
import { MergeState } from "zustand-ready";
import { Coord } from "../../../types/Coord";
import { PointedWord } from "../../../types/PointedWord";
import { getMutations } from "../getMutations";
import { OpenBox } from "./OpenBox";
import { languages } from 'countries-list';
import { WordRecord } from "../../../types/WordRecord";


export type LanguageKey = keyof typeof languages;
export type State = {
  cursor: Coord | null,
  cursorWord: PointedWord | null,
  openBox: OpenBox | null,
  gGTranslateWord: PointedWord | null,
  lastSelectedWord: PointedWord | null,
  contextMenuWord: PointedWord | null,
  targetLanguage: LanguageKey,
  sourceLanguage: LanguageKey | null,
  iframeSrc: string,
  savedWords: WordRecord[],
}
export type Mutations = ReturnType<typeof getMutations>
export type Store = {
  state: State,
  mutations: Mutations,
}
export type StateWithCursorPoint = State & {
  cursorPoint: PointedWord,
}
export type StateWithContextPoint = State & {
  contextMenuWord: PointedWord,
}
export type StateUpdate = PartialDeepKeepNullUnion<State>;

export type Get = GetState<Store>
export type Merge = MergeState<Store, StateUpdate>
export type Context = { get: Get, merge: Merge };
export type StatePath = Path<State>;
