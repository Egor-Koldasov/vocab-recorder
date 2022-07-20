import { State } from "../ContentScript/store/types/Store";

export type Message = {
  name: string;
  state: State;
};
