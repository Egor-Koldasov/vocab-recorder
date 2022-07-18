import { ChangeEvent } from "react";
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
      get().mutations.updateByPath('openBox', {
        drag: {
          active: true,
          dragStartPos: { x: event.clientX, y: event.clientY },
        }
      });
    },
    onDragMouseUp: () => {
      const { state, mutations } = get();
      const dragShift = getDraggingShift(state);
      console.log('dragShift', dragShift);
      const dragStartPos = state.openBox?.drag.dragStartPos;
      if (!dragStartPos) return;
      mutations.updateByPath('openBox', {
        drag: {
          active: false,
          shift: dragShift,
        }
      })
    }
  } as const;
};
