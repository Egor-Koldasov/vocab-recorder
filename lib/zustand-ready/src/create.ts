import _create, { EqualityChecker, GetState, SetState, StateSelector } from 'zustand'
import shallow from 'zustand/shallow'
import { get, Path, Get } from 'dot-get-ts'

import { PartialDeep } from 'type-fest';
import { CreateStoreParams, GetMutations, State, Store, StoreContext } from './Store';
import { mergeExceptArrays } from './util/mergeExceptArrays';


const createMerge = <S extends Store>(set: SetState<S>) => (partial: PartialDeep<State<S>>) => {
  const update = { state: partial };
  return set((store): S => mergeExceptArrays(store, update), true);
}

const makeStoreContext = <S extends Store>(set: SetState<S>, get: GetState<S>): StoreContext<S> => {
  return {
    merge: createMerge(set),
    get
  }
}

const mergeWrapper = <S extends Store>(creator: (params: StoreContext<S>) => S) =>
  (set: SetState<S>, get: GetState<S>) => creator(makeStoreContext(set, get));

export const createBasic =
  <St extends {}, Mt extends {}>(initialState: St, getMutations: GetMutations<Store<St, Mt>>) => {
    type S = Store<St, Mt>;
    const cb = mergeWrapper((context: StoreContext<S>): S => ({
      state: initialState,
      mutations: getMutations(context),
    }));
    return  _create<S>(cb);
  }

export const create =
  <St extends {}, Mt extends {}>(params: CreateStoreParams<St, Mt>) => {
    const useStoreSelector = createBasic<St, Mt>(params.initialState, params.getMutations);
    const useStore =
      <U>(picker: StateSelector<Store<St, Mt>, U>, comp: EqualityChecker<U> | undefined = shallow) =>
        useStoreSelector(picker, comp);
    const useStoreStateSelector = <R>(selector: ((state: St) => R)): R => {
      return useStore((store) => selector(store.state));
    }
    const useStoreState = () => {
      return useStore((store) => store.state);
    }
    const useMutations = () => {
      return useStore((store) => store.mutations);
    }
    const useMutationSelector = <Name extends Path<Mt>>(name: Name): Get<Mt, Name> => {
      const mutations = useStoreSelector((store) => store.mutations);
      return get(mutations, name);
    }
    return {
      useStoreSelector,
      useStore,
      useStoreStateSelector,
      useStoreState,
      useMutationSelector,
      useMutations,
    };
  }
