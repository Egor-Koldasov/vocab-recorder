import { PointedWord } from '../../../types/PointedWord';
import { OpenBox } from '../types/OpenBox';
import { State } from '../types/Store';


const defaultDrag = {
  movedPos: null,
  active: false,
  mouseInBoxPos: null,
};
export const getInitOpenBox = (state: State, word: PointedWord): OpenBox => {
  const drag = state.openBox ? state.openBox.drag : defaultDrag;
  const openBox: OpenBox = {
    open: true,
    point: word,
    translation: '',
    context: word.context,
    ref: null,
    drag,
  };
  return openBox;
};
