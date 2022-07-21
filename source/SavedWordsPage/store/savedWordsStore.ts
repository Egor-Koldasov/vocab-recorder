import { useEffect } from "react";
import { create, DefaultUpdate, Store } from "zustand-ready";
import { WordRecord } from "../../types/WordRecord";
import { loadWords, saveWords } from "../../util/wordsStorage";
import { Parser } from 'json2csv';
import { downloadFile } from "../../util/downloadFile";
import { MultiValue } from "react-select";
import { getWordsForView } from "./derivations/useWordsForView";

export type SavedWordsFilters = {
  tags: string[];
};
export type SavedWordsState = {
  words: WordRecord[],
  loaded: boolean,
  filters: SavedWordsFilters,
}
export type SavedWordsMutations = ReturnType<typeof getMutations>;
export type SavedWordsStore = Store<SavedWordsState, SavedWordsMutations>
type SavedWordsMerge = (update: DefaultUpdate<SavedWordsStore>) => void
type Ctx = { get: () => SavedWordsStore, merge: SavedWordsMerge }

const sortWordsByModifiedDesc = (words: WordRecord[]): WordRecord[] => {
  return [...words].sort((a, b) => -a.date_modified + b.date_modified);
}
const initialState: SavedWordsState = {
  words: [],
  loaded: false,
  filters: {
    tags: [],
  },
}
const getMutations = ({ get, merge }: Ctx) => ({
  loadWordsToStore: async () => {
    const words = await loadWords();
    merge({ words: sortWordsByModifiedDesc(words), loaded: true });
  },
  triggerLoadWords: () => {
    const { mutations } = get();
    mutations.loadWordsToStore();
  },
  removeWord: (index: number) => {
    const { state, mutations } = get();
    const nextWords = [
      ...state.words.slice(0, index),
      ...state.words.slice(index + 1),
    ];
    saveWords(nextWords);
    mutations.loadWordsToStore();
  },
  generateCSV: (): string => {
    const { state } = get();
    const parser = new Parser({
      fields: ['word', 'translation', 'context'],
      header: false,
    });
    const csv = parser.parse(getWordsForView(state.words, state.filters));
    return csv;
  },
  downloadCSV: () => {
    const { mutations } = get();
    const csv = mutations.generateCSV();
    downloadFile('vocab-collector-anki-export.csv', csv);
  },
  onTagSelectChange: (options: MultiValue<{ value: string, label: string }>) => {
    merge({ filters: { tags: options.map(({ value }) => value) } });
  },
});

export const useLoadSavedWords = () => {
  const { triggerLoadWords } = useSavedWordsMutations();
  useEffect(triggerLoadWords, [triggerLoadWords]);
}

const savedWordsStore = create<SavedWordsState, SavedWordsMutations>({
  initialState,
  getMutations,
});

export const {
  useStoreStateSelector: useSavedWordsState,
  useMutations: useSavedWordsMutations,
} = savedWordsStore;
