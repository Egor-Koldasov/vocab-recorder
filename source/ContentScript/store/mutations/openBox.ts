import { ChangeEvent } from "react";
import { getMouseInBoxPos } from "../derivations/getMouseInBoxPos";
import { getDraggingShift } from "../derivations/useBoxCoords";
import { Context } from "../types/Store";
import { WordRecord } from "../../../types/WordRecord";
import { loadWords, saveWords } from "../../../util/wordsStorage";

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
      get().mutations.updateByPath('openBox', { open: false });
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
      const { state, mutations } = get();
      if (!state.openBox) return;
      const words = await loadWords();
      const currentWord: WordRecord = {
        word: state.openBox.point.word,
        context: state.openBox.context,
        translation: state.openBox.translation,
        date_created: Date.now(),
        date_modified: Date.now(),
        tags: [
          `lang:${state.sourceLanguage}`,
        ],
      };
      const nextWords = [...words, currentWord];
      await saveWords(nextWords);
      mutations.updateByPath('openBox', { translation: '' });
    },
    saveAndClose: async () => {
      const { mutations } = get();
      mutations.save();
      mutations.closeBox();
    }
  } as const;
};
