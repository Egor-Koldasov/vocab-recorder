import browser from "webextension-polyfill";
import { WordRecord } from "../types/WordRecord";


export const saveWords = async (words: WordRecord[]): Promise<void> => {
  await browser.storage.sync.set({ words: words.map(w => ({ ...w, tags: w.tags || [] })) });
}
export const loadWords = async (): Promise<WordRecord[]> => {
  const storage = await browser.storage.sync.get('words');
  const words = storage.words || [] as WordRecord[];
  return words;
}