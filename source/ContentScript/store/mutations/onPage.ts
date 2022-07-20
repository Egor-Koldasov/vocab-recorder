import { useListener } from "../../util/useListener";
import { RefObject, useEffect } from "react";
import { sendMessage } from "../../util/sendMessage";
import { keyTrigger } from "../../../settings/box";
import { mouseMoveToCursor, mouseMoveToSelectedWord } from "../../util/mouseMoveToPoint";
import { getInitOpenBox } from "../derivations/getInitOpenBox";
import { Context } from "../types/Store";
import { useMutations } from "../useStore";
import throttle from "lodash/throttle";
import browser, { Runtime } from 'webextension-polyfill';
import { isMessageValid } from "../../util/isMessageValid";
import { stateHasContextPoint } from "../derivations/stateHasContextPoint";



export const onPage = ({ get }: Context) => {
  return {
    openBox: () => {
      const { state, mutations } = get();
      if (!stateHasContextPoint(state)) return;
      sendMessage({ name: 'pointed-word', state });
      mutations.update({ openBox: getInitOpenBox(state) });
    },
    onPageMouseMove: throttle((event: MouseEvent) => {
      const { mutations } = get();
      const point = mouseMoveToSelectedWord(event);
      const cursor = mouseMoveToCursor(event);
      mutations.update({ cursorPoint: point, cursor });
    }, 30),
    onContextMenu: () => {
      const { state, mutations } = get();
      mutations.update({ contextMenuWord: state.cursorPoint });
    },
    onPageKeyDown: (event: KeyboardEvent) => {
      return;
      const { mutations } = get();
      if (event.key !== keyTrigger) return;
      mutations.openBox();
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
    onBgMessage: (message: unknown, sender: Runtime.MessageSender) => {
      const { mutations } = get();
      console.log('message', message, sender);
      if (isMessageValid(message) && message?.name === "context-click") {
        mutations.openBox();
      }
    }
  } as const;
}

const useTrackPointedWord = () => {
  const { onPageMouseMove } = useMutations();
  useListener('mousemove', onPageMouseMove);
};

const useTrackKeyTrigger = () => {
  const { onPageKeyDown } = useMutations();
  useListener('keydown', onPageKeyDown);
};

const useTrackContextMenu = () => {
  const { onContextMenu } = useMutations();
  useListener('contextmenu', onContextMenu);
}

const useListenBgScript = () => {
  const { onBgMessage } = useMutations();
  useEffect(() => {
    browser.runtime.onMessage.addListener(onBgMessage);
    return () => browser.runtime.onMessage.removeListener(onBgMessage);
  }, [onBgMessage]);
}

// const useCloseOnClickOutside = (openBoxRef: RefObject<HTMLDivElement | null>) => {
//   const { onPageOutsideClick } = useMutations();
//   useEventListener('click', onPageOutsideClick(openBoxRef));
// };

export const useOnPageEffects = (/*openBoxRef: RefObject<HTMLDivElement | null>*/) => {
  useTrackPointedWord();
  useTrackKeyTrigger();
  useListenBgScript();
  useTrackContextMenu();
  // useCloseOnClickOutside(openBoxRef);
}

