import { useEventListener } from "../../util/useEventListener";
import { RefObject } from "react";
import { sendMessage } from "../../sendMessage";
import { keyTrigger } from "../../settings/box";
import { mouseMoveToPoint } from "../../util/mouseMoveToPoint";
import { getInitOpenBox } from "../derivations/getInitOpenBox";
import { stateHasCursorPoint } from "../derivations/stateHasCursorPoint";
import { Context } from "../types/Store";
import { useMutations } from "../useStore";


export const onPage = ({ get }: Context) => {
  return {
    onPageMouseMove: (event: MouseEvent) => {
      const { mutations } = get();
      const point = mouseMoveToPoint(event);
      mutations.update({ cursorPoint: point });
    },
    onPageKeyDown: (event: KeyboardEvent) => {
      const { state, mutations } = get();
      if (event.key !== keyTrigger || !stateHasCursorPoint(state)) return;
      sendMessage({ name: 'pointed-word', state });
      mutations.update({ openBox: getInitOpenBox(state) });
      // console.log('keydown', state.point?.word, state.point)
    },
    onPageOutsideClick: (ref: RefObject<HTMLDivElement | null>) => (event: MouseEvent) => {
      const { mutations } = get();
      if (!ref.current || !event.target) return;
      let elementI = event.target as Node;
      while (elementI !== document.body && elementI.parentNode) {
        if (elementI === ref.current) {
          return;
        }
        elementI = elementI.parentNode;
      }
      mutations.update({ openBox: null });
    },
  } as const;
}

const useTrackPointedWord = () => {
  const { onPageMouseMove } = useMutations();
  useEventListener('mousemove', onPageMouseMove);
};

const useTrackKeyTrigger = () => {
  const { onPageKeyDown } = useMutations();
  useEventListener('keydown', onPageKeyDown);
};

// const useCloseOnClickOutside = (openBoxRef: RefObject<HTMLDivElement | null>) => {
//   const { onPageOutsideClick } = useMutations();
//   useEventListener('click', onPageOutsideClick(openBoxRef));
// };

export const useOnPageEffects = (/*openBoxRef: RefObject<HTMLDivElement | null>*/) => {
  useTrackPointedWord();
  useTrackKeyTrigger();
  // useCloseOnClickOutside(openBoxRef);
}

