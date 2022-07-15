import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import styled, { css, StyleSheetManager } from 'styled-components';
import { Coord } from '../../types/Coord';
import { sendMessage } from '../sendMessage';
import { useStore } from '../store/useStore';
import { addCoords } from '../util/addCoords';
import { mouseMoveToPoint } from '../util/mouseMoveToPoint';
import { colors } from './colors';
import { ContextShown } from './ContextShown';
import { Label } from './Label';
import { TextGroup } from './TextGroup';
import stylisImportantPlugin from 'stylis-important-plugin';
import { useScrollBottom } from '../hooks/useScrollBottom';

const gaps = {
  boxPadding: 8,
} as const;

const keyTrigger = 'Shift';
const wholeBoxHeight = 155;
type ContentStyledProps = {
  cursor?: Coord;
}
export const ContentStyled = styled.div<ContentStyledProps>`
  position: absolute;
  background: ${colors.bgMain};
  color: ${colors.textMain};
  z-index: 1201;
  top: 0;
  left: 0;
  font-family: sans-serif;
  font-size: 16px;
  padding: ${gaps.boxPadding}px;
  display: flex;
  flex-direction: column;
  border: 3px solid ${colors.border};
  border-radius: 5px;
  box-shadow: 2px 2px 6px 1px ${colors.shadow};
  ${({ cursor }) => cursor && css`
    top: ${cursor.y}px;
    left: ${cursor.x}px;
  `}
  transform: translateX(-50%);
`;
export const SelectedWord = styled.div`
  font-weight: bold;
  border-bottom: 1px solid ${colors.border};
  padding-bottom: ${gaps.boxPadding}px;
  margin-bottom: ${gaps.boxPadding}px;
  margin-right: -${gaps.boxPadding}px;
  margin-left: -${gaps.boxPadding}px;
  padding-right: ${gaps.boxPadding}px;
  padding-left: ${gaps.boxPadding}px;
`;

export const BoxContent = styled.div`
  display: flex;
  gap: 8px;
`;

// const higlightWord = (sentence: string, word: string) => {
//   return sentence.replaceAll(new RegExp(`(\\W|^)(${word})(\\W|&)`, 'g'), '$1<b>$2</b>$3');
// };

export const Content = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, update] = useStore((store) => [store.state, store.actions.update]);
  const scrollBottom = useScrollBottom();
  const boxCoords = useMemo(() => {
    if (!state.selectedPoint) return { x: 0, y: 0 };
    const rawCoords = addCoords(state.selectedPoint.windowScroll, state.selectedPoint.cursor);
    return {
      y: Math.min(scrollBottom - wholeBoxHeight, rawCoords.y + 15),
      x: rawCoords.x
    };
  }, [state])
  const onMouseMove = useCallback((event: MouseEvent) => {
    const point = mouseMoveToPoint(event);
    update({ cursorPoint: point });
  }, [update]);
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key !== keyTrigger) return;
    sendMessage({ name: 'pointed-word', state });
    update({ selectedPoint: state.cursorPoint });
    // console.log('keydown', state.point?.word, state.point)
  }, [state]);
  const onClick = useCallback((event: MouseEvent) => {
    if (!ref.current || !event.target) return;
    let elementI = event.target as Node;
    while (elementI !== document.body && elementI.parentNode) {
      if (elementI === ref.current) {
        return;
      }
      elementI = elementI.parentNode;
    }
    update({ selectedPoint: null });
  }, [update, ref]);
  const onContextChange = useCallback((event: ChangeEvent) => {
    update({ selectedPoint: { context: event.currentTarget.nodeValue || undefined } });
  }, [update]);
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
  useEffect(() => {
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  })
  // console.log('point', state.point);
  if (!state.selectedPoint) return null;
  return (
    <StyleSheetManager stylisPlugins={[stylisImportantPlugin]}>
      <ContentStyled
        cursor={boxCoords}
        ref={ref}
      >
        <SelectedWord>{state.selectedPoint.word}</SelectedWord>
        <BoxContent>
          <TextGroup>
            <Label>Translation</Label>
            <ContextShown
              value={state.selectedPoint.context}
              onChange={onContextChange}
            />
          </TextGroup>
          <TextGroup>
            <Label>Context</Label>
            <ContextShown
              value={state.selectedPoint.context}
              onChange={onContextChange}
            />
          </TextGroup>
        </BoxContent>
      </ContentStyled>
    </StyleSheetManager>
  );
};
