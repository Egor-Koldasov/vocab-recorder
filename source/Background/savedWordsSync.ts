import browser from "webextension-polyfill";
import { WordRecord } from "../types/WordRecord";
import { isNamedMessage } from "../util/isMessageValid";
import { sendMessageToAllTabs } from "../util/sendMessageToAllTabs";
import { loadWords, saveWords } from "../util/wordsStorage";

type SavedWordsState = {
  words: WordRecord[],
}
const state: SavedWordsState = {
  words: [],
};

export const getWordsSync = () => state.words;

export const initSavedWordsSync = async () => {
  state.words = await loadWords();
  browser.runtime.onMessage.addListener((message, sender) => {
    if (!isNamedMessage(message)) return;
    if (message.name === 'getSavedWords') {
      if (sender.tab?.id) {
        browser.tabs.sendMessage(
          sender.tab.id,
          {
            name: 'getSavedWords_response',
            words: state.words,
          }
        );
      }
      return;
    }
    if (message.name === 'addWord') {
      addWordSync(message.word as WordRecord);
    }
  });
};

export const addWordSync = (word: WordRecord) => {
  state.words = [...state.words, word];
  saveWords(state.words);
  sendMessageToAllTabs({
    name: 'savedWordsUpdated',
    words: state.words,
  });
}
