import { WordRecord } from "../../../types/WordRecord";
import { SavedWordsFilters, useSavedWordsState } from "../savedWordsStore";


export const getWordsForView = (words: WordRecord[], filters: SavedWordsFilters): WordRecord[] => {
  const wordsOnTags =
    filters.tags.length === 0 ?
      words :
      words.filter((word) => {
        return !!word.tags.find((tag) => filters.tags.includes(tag));
      });
  return wordsOnTags;
}

export const useWordsForView = () => {
  const [words, filters] = useSavedWordsState((state) => [state.words, state.filters]);
  return getWordsForView(words, filters);
}