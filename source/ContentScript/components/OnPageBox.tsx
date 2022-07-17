import React from 'react';
import styled, { css, StyleSheetManager } from 'styled-components';
import { Coord } from '../../types/Coord';
import { useMutations, useStoreState } from '../store/useStore';
import { colors } from '../settings/colors';
import { ContextShown } from './ContextShown';
import { Label } from './Label';
import { TextGroup } from './TextGroup';
import { BoxHeader } from './BoxHeader';
import { SelectedWord } from './SelectedWord';
import { BoxContent } from './BoxContent';
import { gaps } from '../settings/box';
import { Drag } from './icons/Drag';
import { stylisAddImportant } from '../util/stylisAddImportant';
import { useBoxAutoCoords } from '../store/derivations/useBoxAutoCoords';
import { useOnPageEffects } from '../store/mutations/onPage';
import { ButtonBar } from './ButtonBar';
import { Button } from './Button';
import { font } from '../settings/font';


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
  font-size: ${font.base}px;
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

export const OnPageBox = () => {
  // const ref = useRef<HTMLDivElement>(null);
  const { openBox } = useStoreState();
  const {
    onContextChange,
    onTranslationChange,
    onCloseClick,
  } = useMutations();
  const boxCoords = useBoxAutoCoords();
  useOnPageEffects();

  if (!openBox) return null;
  return (
    <StyleSheetManager stylisPlugins={[stylisAddImportant]}>
      <ContentStyled
        cursor={boxCoords}
        // ref={ref}
      >
        <BoxHeader>
          <Drag />
          <SelectedWord>{openBox.point.word}</SelectedWord>
        </BoxHeader>
        <BoxContent>
          <TextGroup>
            <Label>Translation</Label>
            <ContextShown
              value={openBox.translation}
              onChange={onTranslationChange}
            />
          </TextGroup>
          <TextGroup>
            <Label>Context</Label>
            <ContextShown
              value={openBox.context}
              onChange={onContextChange}
            />
          </TextGroup>
        </BoxContent>
        <ButtonBar>
          <Button onClick={onCloseClick}>Close</Button>
        </ButtonBar>
      </ContentStyled>
    </StyleSheetManager>
  );
};
