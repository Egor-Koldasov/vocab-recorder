import { PointedWord } from '../../../types/PointedWord';
import { OpenBox } from '../types/OpenBox';
import { State } from '../types/Store';

export const getInitOpenBox = (_: State, word: PointedWord): OpenBox => {
  const openBox: OpenBox = {
    open: true,
    point: word,
    translation: '',
    context: word.context,
    ref: null,
    drag: {
      movedPos: null,
      active: false,
      mouseInBoxPos: null,
    },
  };
  return openBox;
};
