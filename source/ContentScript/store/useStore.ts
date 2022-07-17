import { Mutations, State } from './types/Store'
import { getMutations } from './getMutations';
import { create } from 'zustand-ready';
import { initialState } from './initialState';


export const {
  useStore, useStoreSelector, useMutationSelector, useStoreState, useMutations, useStoreStateSelector,
} =
  create<State, Mutations>({
    initialState,
    getMutations,
  });
