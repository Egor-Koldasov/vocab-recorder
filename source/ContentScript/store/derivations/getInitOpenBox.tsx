import { OpenBox } from '../types/OpenBox';
import { StateWithCursorPoint } from '../types/Store';

export const getInitOpenBox = (state: StateWithCursorPoint): OpenBox => {
  const openBox: OpenBox = {
    point: state.cursorPoint,
    translation: '',
    context: state.cursorPoint.context,
    ref: null,
    drag: {
      shift: { x: 0, y: 0 },
      active: false,
      dragStartPos: null,
    },
  };
  return openBox;
};
