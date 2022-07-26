import { get } from 'dot-get-ts';
import { set } from 'lodash';
import { PartialDeepKeepNullUnion } from 'partial-deep-keep-union';
import { Get } from 'type-fest';
import { Context, State, StatePath, StateUpdate } from '../types/Store';


// TODO: move to zustand-ready
export const basic = ({ merge, get: getStore }: Context) => ({
  update: (update: StateUpdate) => {
    console.debug('State update', update, (new Error()).stack);
    return merge(update);
  },
  updateByPath: <P extends StatePath>(path: P, update: PartialDeepKeepNullUnion<NonNullable<Get<State, P>>>) => {
    const store = getStore();
    const subState: Get<State, P> = get(store.state, path);
    if (!subState) {
      console.error('Updating substate that is not initialized')
      throw new Error('Updating substate that is not initialized');
    }
    console.debug('State update by path', path, update, (new Error()).stack);
    const stateUpdate = set<StateUpdate>({}, path, update);
    return merge(stateUpdate);
  }
}) as const;
