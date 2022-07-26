import { useEffect } from "react";
import browser from "webextension-polyfill";
import { WordRecord } from "../../../types/WordRecord";
import { isNamedMessage } from "../../../util/isMessageValid";
import { Context } from "../types/Store";
import { useMutations } from "../useStore";

export const savedWords = ({ get }: Context) => ({
  loadSavedWords: async () => {
    const { mutations } = get();
    console.log('getSavedWords');
    const onMessage = (message: unknown) => {
      if (!isNamedMessage(message)) return;
      if (message.name === 'getSavedWords_response') {
        console.log('getSavedWords_response');
        mutations.update({ savedWords: message.words as WordRecord[] });
        browser.runtime.onMessage.removeListener(onMessage);
      }
    }
    browser.runtime.onMessage.addListener(onMessage);
    await browser.runtime.sendMessage({ name: 'getSavedWords' });
  },
  trackSavedWordsUpdate: (message: unknown) => {
    if (!isNamedMessage(message)) return;
    if (message.name === 'savedWordsUpdated') {
      console.log('savedWordsUpdated');
      get().mutations.update({ savedWords: message.words as WordRecord[] });
    }
  },
  addWord: (word: WordRecord) => {
    browser.runtime.sendMessage({ name: 'addWord', word });
  }
});

export const useLoadSavedWords = () => {
  const { loadSavedWords } = useMutations();
  useEffect(() => {
    loadSavedWords();
  }, [loadSavedWords]);
}

export const useTrackSavedWordsUpdate = () => {
  const { trackSavedWordsUpdate } = useMutations();
  useEffect(() => {
    browser.runtime.onMessage.addListener(trackSavedWordsUpdate);
    return () => browser.runtime.onMessage.removeListener(trackSavedWordsUpdate);
  }, [trackSavedWordsUpdate]);
}

export const useSavedWordsSync = () => {
  useLoadSavedWords();
  useTrackSavedWordsUpdate();
}
