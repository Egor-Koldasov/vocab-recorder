import { PartialDeep } from 'type-fest';
import { GetState } from 'zustand';

export type Store<State extends {} = {}, Mutations extends {} = {}> = {
  state: State,
  mutations: Mutations,
};

export type State<S extends Store> = S['state'];
export type Mutations<S extends Store> = S['mutations'];

export type MergeState<S extends Store> =
  (partial: PartialDeep<State<S>>) => void |
  ((setPartial: (state: State<S>) => PartialDeep<State<S>>) => void)


export type CreateStoreParams<St extends {}, Mt extends {}> = {
  initialState: St,
  getMutations: GetMutations<Store<St, Mt>>,
}

export type GetMutations<S extends Store> = (context: StoreContext<S>) => Mutations<S>

export type StoreContext<S extends Store> = {
  get: GetState<S>,
  merge: MergeState<S>,
}