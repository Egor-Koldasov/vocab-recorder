import React from 'react';
import { useListener } from "../../util/useListener";
import { useEffect } from "react";
import { sendMessage } from "../../util/sendMessage";
import { keyTrigger } from "../../../settings/box";
import { mouseMoveToCursor, mouseMoveToSelectedWord } from "../../util/mouseMoveToPoint";
import { getInitOpenBox } from "../derivations/getInitOpenBox";
import { Context } from "../types/Store";
import { useMutations } from "../useStore";
import throttle from "lodash/throttle";
import browser, { Runtime } from 'webextension-polyfill';
import { isMessageValid } from "../../util/isMessageValid";
import { createRoot } from "react-dom/client";
import { GTranslateEmbed } from "../../components/GTranslateEmbed/GTranslateEmbed";
import { BrowserWithShadowRoot } from '../../../types/BrowserWithShadowRoot';
import { StyleSheetManager } from 'styled-components';
import { PointedWord } from '../../../types/PointedWord';
import { isDeepParentNode } from '../../../util/isDeepParentNode';


const gTranslateEmbedId = 'vocab-collector-gtranslate-root';
export const onPage = ({ get }: Context) => {
  return {
    openBox: (word?: PointedWord) => {
      const { state, mutations } = get();
      const wordUsed = word || state.contextMenuWord;
      if (!wordUsed) return;
      sendMessage({ name: 'pointed-word', state });
      mutations.update({ openBox: getInitOpenBox(state, wordUsed) });
    },
    onPageMouseMove: throttle((event: MouseEvent) => {
      const { mutations } = get();
      const point = mouseMoveToSelectedWord(event);
      const cursor = mouseMoveToCursor(event);
      if (point) mutations.update({ cursorWord: point });
      mutations.update({ cursor });
    }, 30),
    onPageMouseUp: () => {
      const { state, mutations } = get();
      const selection = window.getSelection();
      if (!selection || selection.anchorOffset === selection.focusOffset) return;
      mutations.update({ lastSelectedWord: state.cursorWord });
    },
    onContextMenu: () => {
      const { state, mutations } = get();
      mutations.update({ contextMenuWord: state.cursorWord });
    },
    onPageKeyDown: (event: KeyboardEvent) => {
      return;
      const { mutations } = get();
      if (event.key !== keyTrigger) return;
      mutations.openBox();
      // console.log('keydown', state.point?.word, state.point)
    },
    onDocumentMouseDown: (event: MouseEvent) => {
      const { mutations } = get();
      mutations.listenGTranslateBtnClick(event);
    },
    onBgMessage: (message: unknown, sender: Runtime.MessageSender) => {
      const { state, mutations } = get();
      console.log('message', message, sender);
      if (isMessageValid(message) && message?.name === "context-click" && state.contextMenuWord) {
        mutations.openBox(state.contextMenuWord);
      }
    },
    listenToGTranslate: () => {
      const gTranslatePopup = document.querySelector('#gtx-host');
      if (!gTranslatePopup) return;
      const supportedBrowser = browser as BrowserWithShadowRoot;
      const gTranslateShadowRoot = supportedBrowser.dom.openOrClosedShadowRoot(gTranslatePopup);
      if (!gTranslateShadowRoot || gTranslateShadowRoot.querySelector(`#${gTranslateEmbedId}`)) return;
      const gTranslateEmbedRoot = document.createElement('div');
      const container = (Array.from(gTranslateShadowRoot.childNodes).find(e => e.nodeName === 'DIV')) as Element | undefined;
      if (!container) return;
      const styleContainer = document.createElement('div');
      container.appendChild(styleContainer);
      gTranslateEmbedRoot.id = gTranslateEmbedId;
      gTranslateEmbedRoot.style.width = '100%';
      container.append(gTranslateEmbedRoot);
      const root = createRoot(gTranslateEmbedRoot);
      root.render(
        <StyleSheetManager target={styleContainer}>
          <GTranslateEmbed />
        </StyleSheetManager>
      );
    },
    listenGTranslateBtnClick: (event: MouseEvent) => {
      const target = event.target as Element | null;
      const gTranslateBtn = document.querySelector('#gtx-trans');
      if (!gTranslateBtn || !target || !isDeepParentNode(target, gTranslateBtn)) return;
      const { state, mutations } = get();
      mutations.update({ gGTranslateWord: state.lastSelectedWord });
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

const useTrackGTranslate = () => {
  const { listenToGTranslate } = useMutations();
  useEffect(() => {
    const intervalId = setInterval(listenToGTranslate, 100);
    return () => clearInterval(intervalId);
  }, [listenToGTranslate])
}

const useTrackDocumentMouseDown = () => {
  const { onDocumentMouseDown } = useMutations();
  useListener('mousedown', onDocumentMouseDown);
};

const useTrackMouseUp = () => {
  const { onPageMouseUp } = useMutations();
  useListener('mouseup', onPageMouseUp);
}

export const useOnPageEffects = () => {
  useTrackPointedWord();
  useTrackKeyTrigger();
  useListenBgScript();
  useTrackContextMenu();
  useTrackGTranslate();
  useTrackDocumentMouseDown();
  useTrackMouseUp();
}

