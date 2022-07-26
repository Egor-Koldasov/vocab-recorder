import React from 'react';
import { useListener } from "../../util/useListener";
import { useEffect } from "react";
import { sendMessage } from "../../util/sendMessage";
import { keyTrigger } from "../../../settings/box";
import { mouseMoveToCursor, mouseMoveToSelectedWord } from "../../util/mouseMoveToPoint";
import { getInitOpenBox } from "../derivations/getInitOpenBox";
import { Context, LanguageKey } from "../types/Store";
import { useMutations } from "../useStore";
import throttle from "lodash/throttle";
import browser, { Runtime } from 'webextension-polyfill';
import { isNamedMessage } from "../../../util/isMessageValid";
import { createRoot } from "react-dom/client";
import { GTranslateEmbed } from "../../components/GTranslateEmbed/GTranslateEmbed";
import { StyleSheetManager } from 'styled-components';
import { PointedWord } from '../../../types/PointedWord';
import { isDeepParentNode } from '../../../util/isDeepParentNode';
import { getGTranslateShadowRoot } from '../../util/getGTranslateShadowRoot';


const gTranslateEmbedId = 'vocab-collector-gtranslate-root';
export const onPage = ({ get }: Context) => {
  return {
    openBox: (word?: PointedWord) => {
      const { state, mutations } = get();
      const wordUsed = word || state.contextMenuWord;
      if (!wordUsed) return;
      sendMessage({ name: 'pointed-word', state });
      mutations.update({ openBox: getInitOpenBox(state, wordUsed) });
      mutations.setGTranslateIframe();
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
      if (isNamedMessage(message) && message?.name === "context-click" && state.contextMenuWord) {
        mutations.openBox(state.contextMenuWord);
      }
    },
    listenToGTranslate: () => {
      const gTranslatePopup = document.querySelector('#gtx-host');
      if (!gTranslatePopup) return;
      const gTranslateShadowRoot = getGTranslateShadowRoot();
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
    },
    fillGTranslateWord: () => {
      const root = getGTranslateShadowRoot();
      if (!root) return;
      const { mutations } = get();
      const langEl = root.querySelector('.gtx-lang-selector') as HTMLSelectElement;
      const translationEl = root.querySelectorAll('.gtx-body')[1];

      const langCode = langEl.value;
      const translation = translationEl?.textContent || '';
      mutations.update({ sourceLanguage: langCode as LanguageKey });
      mutations.updateByPath('openBox', { translation });
    },
    openOnGTranslate: () => {
      const { state, mutations } = get();
      if (state.gGTranslateWord) {
        mutations.openBox(state.gGTranslateWord);
        mutations.fillGTranslateWord();
      }
    },
    gTransalteQuickAdd: () => {
      const { mutations } = get();
      mutations.openOnGTranslate();
      mutations.saveAndClose();
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

