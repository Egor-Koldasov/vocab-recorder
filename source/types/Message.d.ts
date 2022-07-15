import { State } from "../ContentScript/store/Store";
import { ContentState } from "./ContentState";

export type Message = {
  name: string;
  state: State;
};
