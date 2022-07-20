import React from 'react';
import styled from "styled-components";
import { Button } from '../../../components/Button';
import { useMutations, useStoreStateSelector } from '../../store/useStore';

export const GTranslateEmbedStyled = styled.div`
  display: flex;
  width: 100%;
`;

export const GTranslateEmbed = () => {
  const [gGTranslateWord] = useStoreStateSelector((state) => [state.gGTranslateWord]);
  const { openBox } = useMutations();
  return (
    <GTranslateEmbedStyled>
      <Button
        onClick={() => {
          if (gGTranslateWord) openBox(gGTranslateWord);
        }}
      >
        Add
      </Button>
    </GTranslateEmbedStyled>
  );
};
