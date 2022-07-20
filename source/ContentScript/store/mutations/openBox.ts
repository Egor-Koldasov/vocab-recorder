import { ChangeEvent } from "react";
import browser from 'webextension-polyfill';
import { getMouseInBoxPos } from "../derivations/getMouseInBoxPos";
import { getDraggingShift } from "../derivations/useBoxCoords";
import { Context } from "../types/Store";
import { WordRecord } from "../../../types/WordRecord";

export const openBox = ({ get }: Context) => {
  return {
    onContextChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { mutations } = get();
      mutations.updateByPath('openBox', { context: event.currentTarget.value });
    },
    onTranslationChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { mutations } = get();
      mutations.updateByPath('openBox', { translation: event.currentTarget.value });
    },
    closeBox: () => {
      get().mutations.update({ openBox: null });
    },
    onDragMouseDown: (event: MouseEvent) => {
      const { state, mutations } = get();
      const mouseInBoxPos = getMouseInBoxPos(state, event);
      mutations.updateByPath('openBox', {
        drag: {
          active: true,
          mouseInBoxPos,
        }
      });
    },
    onDragMouseUp: () => {
      const { state, mutations } = get();
      if (!state.openBox?.drag.active) return;
      const dragShift = getDraggingShift(state);
      const mouseInBoxPos = state.openBox?.drag.mouseInBoxPos;
      if (!mouseInBoxPos) return;
      mutations.updateByPath('openBox', {
        drag: {
          active: false,
          movedPos: dragShift,
        }
      })
    },
    onSelectedWordChange: (event: ChangeEvent<HTMLInputElement>) => {
      const { mutations } = get();
      mutations.updateByPath('openBox', { point: { word: event.currentTarget.value } });
    },
    save: async () => {
      const { state } = get();
      if (!state.openBox) return;
      const storage = await browser.storage.sync.get('words');
      const words = (storage.words || []) as WordRecord[];
      const currentWord: WordRecord = {
        word: state.openBox.point.word,
        context: state.openBox.context,
        translation: state.openBox.translation,
        date_created: Date.now(),
        date_modified: Date.now(),
      };
      const nextWords = [...words, currentWord];
      await browser.storage.sync.set({ words: nextWords });
    },
    saveAndClose: async () => {
      const { mutations } = get();
      mutations.save();
      mutations.closeBox();
    }
  } as const;
};
