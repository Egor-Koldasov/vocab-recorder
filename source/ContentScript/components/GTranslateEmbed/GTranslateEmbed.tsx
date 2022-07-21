import React from 'react';
import styled from "styled-components";
import { Button } from '../../../components/Button';
import { useMutations } from '../../store/useStore';

export const GTranslateEmbedStyled = styled.div`
  display: flex;
  width: 100%;
`;

export const GTranslateEmbed = () => {
  const { openOnGTranslate } = useMutations();
  return (
    <GTranslateEmbedStyled>
      <Button
        onClick={openOnGTranslate}
      >
        Add
      </Button>
    </GTranslateEmbedStyled>
  );
};
