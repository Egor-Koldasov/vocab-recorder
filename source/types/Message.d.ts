import { State } from "../ContentScript/store/types/Store";
import { ContentState } from "./ContentState";

export type Message = {
  name: string;
  state: State;
};
