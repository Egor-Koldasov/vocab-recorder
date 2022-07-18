import { OpenBox } from '../types/OpenBox';
import { StateWithCursorPoint } from '../types/Store';

export const getInitOpenBox = (state: StateWithCursorPoint): OpenBox => {
  const openBox: OpenBox = {
    point: state.cursorPoint,
    translation: '',
    context: state.cursorPoint.context,
    ref: null,
    drag: {
      movedPos: null,
      active: false,
      mouseInBoxPos: null,
    },
  };
  return openBox;
};
