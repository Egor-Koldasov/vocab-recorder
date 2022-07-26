import { ChangeEvent } from "react";
import { getMouseInBoxPos } from "../derivations/getMouseInBoxPos";
import { getDraggingShift } from "../derivations/useBoxCoords";
import { Context } from "../types/Store";
import { WordRecord } from "../../../types/WordRecord";
import toast from "react-hot-toast";
import { getGlosbeUrl, getGTransalteUrl, getReversoUrl, IframeProps, stateToIframeProps } from "../derivations/iframeUrls";

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
      mutations.addWord(currentWord);
      toast.success(`Added "${currentWord.word}"`);
      mutations.updateByPath('openBox', { translation: '' });
    },
    saveAndClose: async () => {
      const { mutations } = get();
      mutations.save();
      mutations.closeBox();
    },
    setIframe: (getIframeUrl: ((p: IframeProps) => string)) => {
      const { state, mutations } = get();
      mutations.update({ iframeSrc: getIframeUrl(stateToIframeProps(state)) });
    },
    setGTranslateIframe: () => get().mutations.setIframe(getGTransalteUrl),
    setGlosbeIframe: () => get().mutations.setIframe(getGlosbeUrl),
    setReversoIframe: () => get().mutations.setIframe(getReversoUrl),
  } as const;
};
