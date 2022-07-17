import { OpenBox } from '../types/OpenBox';
import { StateWithCursorPoint } from '../types/Store';

export const getInitOpenBox = (state: StateWithCursorPoint): OpenBox => {
  const openBox: OpenBox = {
    point: state.cursorPoint,
    translation: '',
    context: state.cursorPoint.context,
    drag: {
      active: false,
      pos: null,
    },
  };
  return openBox;
};
