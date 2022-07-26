import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Coord } from '../../types/Coord';
import { useMutations, useStoreStateSelector } from '../store/useStore';
import { colors } from '../../settings/colors';
import { ContextShown } from './ContextShown';
import { Label } from './Label';
import { TextGroup } from './TextGroup';
import { BoxHeader } from './BoxHeader';
import { SelectedWord } from './SelectedWord';
import { BoxContent, BoxContentRow } from './BoxContent';
import { useBoxCoords } from '../store/derivations/useBoxCoords';
import { useOnPageEffects } from '../store/mutations/onPage';
import { ButtonBar } from './ButtonBar';
import { Button } from '../../components/Button';
import { font } from '../../settings/font';
import { DragButton } from './DragButton';
import { QuickLinkList } from './QuickLinkList';
import { LinkBtn } from './LinkBtn';
import { useIsWordDuplicated } from '../store/derivations/useIsWordDuplicated';


type OnPageBoxStyledProps = {
  pos?: Coord;
}
export const OnPageBoxStyled = styled.div<OnPageBoxStyledProps>`
  position: fixed;
  background: ${colors.bgMain};
  color: ${colors.textMain};
  z-index: 1201;
  top: 0;
  left: 0;
  font-family: sans-serif;
  font-size: ${font.base}px;
  display: flex;
  flex-direction: column;
  border: 3px solid ${colors.border};
  border-radius: 5px;
  box-shadow: 2px 2px 6px 1px ${colors.shadow};
  ${({ pos: cursor }) => cursor && css`
    top: ${cursor.y}px;
    left: ${cursor.x}px;
  `}
`;

export const OnPageBox = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [
    openBox,
  ] = useStoreStateSelector((state) => [
    state.openBox,
    state.iframeSrc,
  ]);
  const {
    onContextChange,
    onTranslationChange,
    closeBox,
    updateByPath,
    onSelectedWordChange,
    save,
    saveAndClose,
    setGTranslateIframe,
    setGlosbeIframe,
    setReversoIframe,
  } = useMutations();
  const boxCoords = useBoxCoords();
  const wordDuplicated = useIsWordDuplicated();
  useOnPageEffects();
  useEffect(() => {
    if (openBox && !openBox.ref) updateByPath('openBox', { ref: () => ref });
  }, [openBox, ref])

  if (!openBox?.open) return null;
  return (
    <OnPageBoxStyled
      pos={boxCoords}
      ref={ref}
    >
      <BoxHeader>
        <DragButton />
        <SelectedWord
          value={openBox.point.word}
          onChange={onSelectedWordChange}
          wordDuplicated={wordDuplicated}
          title={wordDuplicated ? 'Already exists' : ''}
        />
      </BoxHeader>
      <BoxContent>
        <BoxContentRow>
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
        </BoxContentRow>
      </BoxContent>
      <ButtonBar>
        <Button onClick={closeBox}>Close</Button>
        <Button
          onClick={save}
          disabled={wordDuplicated}
          title={wordDuplicated ? 'Word is already saved' : ''}
        >Save</Button>
        <Button
          onClick={saveAndClose}
          disabled={wordDuplicated}
          title={wordDuplicated ? 'Word is already saved' : ''}
        >Save and close</Button>
      </ButtonBar>
      <BoxContentRow>
        <QuickLinkList>
          <LinkBtn onClick={setGTranslateIframe}>
            GTranslate
          </LinkBtn>
          <LinkBtn onClick={setGlosbeIframe}>
            Glosbe
          </LinkBtn>
          <LinkBtn onClick={setReversoIframe}>
            Reverso
          </LinkBtn>
        </QuickLinkList>
      </BoxContentRow>
    </OnPageBoxStyled>
  );
};
