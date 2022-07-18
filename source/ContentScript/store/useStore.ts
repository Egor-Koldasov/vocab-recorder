import { Mutations, State, StateUpdate } from './types/Store'
import { getMutations } from './getMutations';
import { create } from 'zustand-ready';
import { initialState } from './initialState';
import { merge, mergeWith } from 'lodash';


export const {
  useStore,
  useStoreSelector,
  useMutationSelector,
  useStoreState,
  useMutations,
  useStoreStateSelector,
} =
  create<State, Mutations, StateUpdate>({
    initialState,
    getMutations,
  });

type WindowWithStore = Window & {
  store?: typeof useStoreSelector,
  merge?: typeof merge
  mergeWith?: typeof mergeWith
}
const windowWithStore = window as WindowWithStore;
windowWithStore.store = useStoreSelector;
windowWithStore.merge = merge;
windowWithStore.mergeWith = mergeWith;
