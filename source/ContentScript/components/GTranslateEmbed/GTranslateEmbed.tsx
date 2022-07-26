import React from 'react';
import styled from "styled-components";
import { Button } from '../../../components/Button';
import { gaps } from '../../../settings/box';
import { useMutations } from '../../store/useStore';

export const GTranslateEmbedStyled = styled.div`
  display: flex;
  width: 100%;
  gap: ${gaps.btnMarginX}px;
`;

export const GTranslateEmbed = () => {
  const { openOnGTranslate, gTransalteQuickAdd } = useMutations();
  return (
    <GTranslateEmbedStyled>
      <Button
        onClick={openOnGTranslate}
      >
        Edit
      </Button>
      <Button
        onClick={gTransalteQuickAdd}
      >
        Quick-add
      </Button>
    </GTranslateEmbedStyled>
  );
};
