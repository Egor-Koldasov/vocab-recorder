import _create, { GetState, SetState } from 'zustand'
import produce from 'immer'
import shallow from 'zustand/shallow'
import { get, Path, Get } from 'dot-get-ts'
import { AnyObject, CreateStoreParams, DefaultUpdate, GetMutations, Store, StoreContext } from './Store';
import { mergeExceptArrays } from './util/mergeExceptArrays';


const createMerge =
  <S extends Store, Update = DefaultUpdate<S>>
  (set: SetState<S>) => (partial: Update) => {
    const update = { state: partial };
    return set((store): S => {
      const nextStore =
        produce(store, (storeDraft) => { mergeExceptArrays(storeDraft, update) });
      return nextStore as S;
    },  true);
  }

const makeStoreContext =
  <S extends Store, Update = DefaultUpdate<S>>
  (set: SetState<S>, get: GetState<S>): StoreContext<S, Update> => {
    return {
      merge: createMerge(set),
      get
    }
  }

const mergeWrapper = <S extends Store, Update = DefaultUpdate<S>>
  (creator: (params: StoreContext<S, Update>) => S) =>
  (set: SetState<S>, get: GetState<S>) => creator(makeStoreContext(set, get));

export const createBasic =
  <St extends AnyObject, Mt extends AnyObject, Update = DefaultUpdate<Store<St, Mt>>>
  (initialState: St, getMutations: GetMutations<Store<St, Mt>, Update>) => {
    type S = Store<St, Mt>;
    const cb = mergeWrapper((context: StoreContext<S, Update>): S => ({
      state: initialState,
      mutations: getMutations(context),
    }));
    return  _create<S>(cb);
  }

export const create =
  <St extends AnyObject, Mt extends AnyObject, Update = DefaultUpdate<Store<St, Mt>>>
  (params: CreateStoreParams<St, Mt, Update>) => {
    const useStoreSelector = createBasic<St, Mt, Update>(params.initialState, params.getMutations);
    const useStore =
      <U>(picker: (store: Store<St, Mt>) => U, comp: ((a: U, b: U) => boolean) | undefined = shallow) =>
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
