import { OpenBox } from '../types/OpenBox';
import { StateWithContextPoint } from '../types/Store';

export const getInitOpenBox = (state: StateWithContextPoint): OpenBox => {
  const openBox: OpenBox = {
    point: state.contextMenuWord,
    translation: '',
    context: state.contextMenuWord.context,
    ref: null,
    drag: {
      movedPos: null,
      active: false,
      mouseInBoxPos: null,
    },
  };
  return openBox;
};
