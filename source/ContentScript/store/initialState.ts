import { State } from "./types/Store";

export const initialState: State = {
  cursor: null,
  cursorWord: null,
  openBox: null,
  contextMenuWord: null,
  sourceLanguage: 'pt',
  targetLanguage: 'en',
  gGTranslateWord: null,
  lastSelectedWord: null,
};
