import { PartialDeep } from 'type-fest';
import { GetState } from 'zustand';


export type AnyObject = Record<string, unknown>
export type Store<State extends AnyObject = AnyObject, Mutations extends AnyObject = AnyObject> = {
  state: State,
  mutations: Mutations,
};

export type State<S extends Store> = S['state'];
export type Mutations<S extends Store> = S['mutations'];
export type DefaultUpdate<S extends Store> = PartialDeep<State<S>>;

export type MergeState<S extends Store, Update = DefaultUpdate<S>> =
  (partial: Update) => void |
  ((setPartial: (state: State<S>) => Update) => void)


export type CreateStoreParams<
  St extends AnyObject,
  Mt extends AnyObject,
  Update = DefaultUpdate<Store<St, Mt>>
> = {
  initialState: St,
  getMutations: GetMutations<Store<St, Mt>, Update>,
}

export type GetMutations<S extends Store, Update = DefaultUpdate<S>> =
  (context: StoreContext<S, Update>) => Mutations<S>

export type StoreContext<S extends Store, Update = DefaultUpdate<S>> = {
  get: GetState<S>,
  merge: MergeState<S, Update>,
}