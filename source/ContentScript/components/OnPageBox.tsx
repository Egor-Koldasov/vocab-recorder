import React, { useEffect, useRef } from 'react';
import styled, { css, StyleSheetManager } from 'styled-components';
import { Coord } from '../../types/Coord';
import { useMutations, useStoreStateSelector } from '../store/useStore';
import { colors } from '../../settings/colors';
import { ContextShown } from './ContextShown';
import { Label } from './Label';
import { TextGroup } from './TextGroup';
import { BoxHeader } from './BoxHeader';
import { SelectedWord } from './SelectedWord';
import { BoxContent, BoxContentRow } from './BoxContent';
import { stylisAddImportant } from '../util/stylisAddImportant';
import { useBoxCoords } from '../store/derivations/useBoxCoords';
import { useOnPageEffects } from '../store/mutations/onPage';
import { ButtonBar } from './ButtonBar';
import { Button } from '../../components/Button';
import { font } from '../../settings/font';
import { DragButton } from './DragButton';
import { QuickLinkList } from './QuickLinkList';
import { languages } from 'countries-list';


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
  display: flex;
  flex-direction: column;
  border: 3px solid ${colors.border};
  border-radius: 5px;
  box-shadow: 2px 2px 6px 1px ${colors.shadow};
  ${({ cursor }) => cursor && css`
    top: ${cursor.y}px;
    left: ${cursor.x}px;
  `}
`;
export const OnPageBox = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [
    openBox,
    sourceLanguage,
    targetLanguage,
  ] = useStoreStateSelector((state) => [
    state.openBox,
    state.sourceLanguage,
    state.targetLanguage,
  ]);
  const {
    onContextChange,
    onTranslationChange,
    closeBox,
    updateByPath,
    onSelectedWordChange,
    save,
    saveAndClose,
  } = useMutations();
  const boxCoords = useBoxCoords();
  useOnPageEffects();
  useEffect(() => {
    if (openBox && !openBox.ref) updateByPath('openBox', { ref: () => ref });
  }, [openBox, ref])

  if (!openBox) return null;
  return (
    <StyleSheetManager stylisPlugins={[stylisAddImportant]}>
      <ContentStyled
        cursor={boxCoords}
        ref={ref}
      >
        <BoxHeader>
          <DragButton />
          <SelectedWord
            value={openBox.point.word}
            onChange={onSelectedWordChange}
          />
        </BoxHeader>
        <BoxContent>
          <BoxContentRow>
            <QuickLinkList>
              <a
                href={`https://translate.google.com/?sl=${sourceLanguage}&tl=${targetLanguage}&text=${openBox.point.word}`}
                target={
                  window.location.hostname === 'translate.google.com' ?
                    '_self' :
                    '_blank'
                }
                rel="noreferrer"
              >
                GTranslate
              </a>
              <a
                href={`https://${targetLanguage}.glosbe.com/${sourceLanguage}/${targetLanguage}/${openBox.point.word}`}
                target={
                  window.location.hostname === `${targetLanguage}.glosbe.com` ?
                    '_self' :
                    '_blank'
                }
                rel="noreferrer"
              >
                Glosbe
              </a>
              {sourceLanguage && (
                <a
                  href={`https://context.reverso.net/translation/${languages[sourceLanguage].name.toLocaleLowerCase()}-${languages[targetLanguage].name.toLocaleLowerCase()}/${openBox.point.word}`}
                  target={
                    window.location.hostname === 'context.reverso.net' ?
                      '_self' :
                      '_blank'
                  }
                  rel="noreferrer"
                >
                  Reverso
                </a>
              )}
            </QuickLinkList>
          </BoxContentRow>
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
          <Button onClick={save}>Save</Button>
          <Button onClick={saveAndClose}>Save and close</Button>
        </ButtonBar>
      </ContentStyled>
    </StyleSheetManager>
  );
};
