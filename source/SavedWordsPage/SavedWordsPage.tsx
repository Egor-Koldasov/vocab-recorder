import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Table, TBody, TD, Thead, TR } from './components/Table';
import { WordContext } from './components/WordContext';
import { useLoadSavedWords, useSavedWordsMutations, useSavedWordsState } from './store/savedWordsStore';

import './styles.scss';

const SaveWordsPageStyles = styled.div`
  font-family: sans-serif;
  font-size: 16px;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${Table} {
    width: 100%;
    max-width: 1200px;
  }
`

const SavedWordsPage: React.FC = () => {
  const { words } = useSavedWordsState((state) => state);
  const { removeWord, downloadCSV } = useSavedWordsMutations();
  useLoadSavedWords();
  return (
    <SaveWordsPageStyles>
      <Button onClick={downloadCSV}>Export CSV</Button>
      <Table>
        <Thead>
          <TR>
            <TD>Actions</TD>
            <TD>Word</TD>
            <TD>Translation</TD>
            <TD>Date added</TD>
            <TD>Context</TD>
          </TR>
        </Thead>
        <TBody>
          {words.map((word, index) => (
            <TR key={index}>
              <TD>
                <Button
                  onClick={() => removeWord(index)}
                >
                  Remove
                </Button>
              </TD>
              <TD>{word.word}</TD>
              <TD>{word.translation}</TD>
              <TD>{(String(new Date(word.date_modified)).split(' ').slice(0, 5).join(' '))}</TD>
              <TD><WordContext>{word.context}</WordContext></TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </SaveWordsPageStyles>
  );
};

export default SavedWordsPage;
