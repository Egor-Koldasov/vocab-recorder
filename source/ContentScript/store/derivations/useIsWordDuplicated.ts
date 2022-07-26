import { WordRecord } from "../../../types/WordRecord";
import { useStoreStateSelector } from "../useStore";

export const isWordDuplicated = (word: string, words: WordRecord[]): boolean => {
  return !!words.find((wordRec) => wordRec.word.toLowerCase() === word.toLowerCase());
}

export const useIsWordDuplicated = () => {
  const [ word, savedWords ] = useStoreStateSelector((state) => [
    state.openBox?.point.word,
    state.savedWords,
  ]);
  return !!word && isWordDuplicated(word, savedWords);
}