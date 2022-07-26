import React, { useMemo } from 'react';
import styled from "styled-components";
import { Button } from '../../../components/Button';
import { gaps } from '../../../settings/box';
import { isWordDuplicated } from '../../store/derivations/useIsWordDuplicated';
import { useMutations, useStoreStateSelector } from '../../store/useStore';

export const GTranslateEmbedStyled = styled.div`
  display: flex;
  width: 100%;
  gap: ${gaps.btnMarginX}px;
`;

export const GTranslateEmbed = () => {
  const [ gGTranslateWord, savedWords ] = useStoreStateSelector((state) => [
    state.gGTranslateWord,
    state.savedWords,
  ]);
  const { openOnGTranslate, gTransalteQuickAdd } = useMutations();
  const wordDuplicated = useMemo(() => {
    if (!gGTranslateWord) return false;
    return isWordDuplicated(gGTranslateWord.word, savedWords)
  }, [gGTranslateWord, savedWords]);
  return (
    <GTranslateEmbedStyled>
      <Button
        onClick={openOnGTranslate}
      >
        Edit
      </Button>
      <Button
        onClick={gTransalteQuickAdd}
        disabled={wordDuplicated}
        title={wordDuplicated ? 'Word is already saved' : ''}
      >
        Add
      </Button>
    </GTranslateEmbedStyled>
  );
};
