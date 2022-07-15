import create, { EqualityChecker, StateSelector } from 'zustand'
import shallow from 'zustand/shallow'
import { State, Store } from './Store'
import { PartialDeep } from 'type-fest';
import { mergeExceptArrays } from '../util/mergeExceptArrays';


type Set = (
  partial: (Store | Partial<Store>) | ((state: Store) => (Store | Partial<Store>)),
  replace?: boolean
) => void;
type MergeState =
  (partial: PartialDeep<State>) => void |
  ((setPartial: (state: State) => PartialDeep<State>) => void)
const createMerge = (set: Set) => (partial: PartialDeep<State>) =>
  set((store): Store => mergeExceptArrays(store, { state: partial }), true);
const mergeWrapper = (creator: (merge: MergeState) => Store) =>
  (set: Set) => creator(createMerge(set));


export const useStoreInitial = create<Store>(mergeWrapper((merge) => ({
  state: { cursorPoint: null, selectedPoint: null },
  actions: { update: (update: PartialDeep<State>) => merge(update) },
})));

export const useStore =
  <U>(picker: StateSelector<Store, U>, comp: EqualityChecker<U> | undefined = shallow) =>
    useStoreInitial(picker, comp);