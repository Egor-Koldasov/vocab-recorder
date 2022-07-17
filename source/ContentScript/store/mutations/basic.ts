import { PartialDeep } from 'type-fest';
import { Context, State } from '../types/Store';


export const basic = ({ merge }: Context) => ({
  update: (update: PartialDeep<State>) => {
    console.debug('State update', update, (new Error()).stack);
    return merge(update);
  },
}) as const;
