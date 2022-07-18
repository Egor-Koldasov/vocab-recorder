import { ChangeEvent } from "react";
import { getMouseInBoxPos } from "../derivations/getMouseInBoxPos";
import { getDraggingShift } from "../derivations/useBoxCoords";
import { Context } from "../types/Store";

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
    onCloseClick: () => {
      get().mutations.update({ openBox: null });
    },
    onDragMouseDown: (event: MouseEvent) => {
      console.log('onDragMouseDown');
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
      const dragShift = getDraggingShift(state);
      console.log('dragShift', dragShift);
      const mouseInBoxPos = state.openBox?.drag.mouseInBoxPos;
      if (!mouseInBoxPos) return;
      mutations.updateByPath('openBox', {
        drag: {
          active: false,
          movedPos: dragShift,
        }
      })
    }
  } as const;
};
