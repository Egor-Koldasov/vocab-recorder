import React from 'react';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { OnPageBox } from './components/OnPageBox';
import { useSavedWordsSync } from './store/mutations/savedWords';

export const ContentAppStyled = styled.div`
  .toast-container {
    & > div {
      left: auto;
    }
  }
`;
export const ContentApp = () => {
  useSavedWordsSync();
  return (
    <ContentAppStyled>
      <Toaster
        containerClassName='toast-container'
        toastOptions={{
          className: 'toast-notification',
        }}
      />
      <OnPageBox />
    </ContentAppStyled>
  );
};
