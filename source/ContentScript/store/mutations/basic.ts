import { PartialDeep } from 'type-fest';
import { State } from 'zustand';
import { Context } from '../types/Store';


export const basic = ({ merge }: Context) => ({
  update: (update: PartialDeep<State>) => {
    console.debug('State update', update);
    return merge(update);
  },
}) as const;
