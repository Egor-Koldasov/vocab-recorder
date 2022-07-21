import * as React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { useTagCounts } from './store/derivations/useTagCounts';
import { Table, TBody, TD, Thead, TR, TRHeader } from './components/Table';
import { Tag } from './components/Tag';
import { WordContext } from './components/WordContext';
import { useLoadSavedWords, useSavedWordsMutations } from './store/savedWordsStore';

import './styles.scss';
import { useWordsForView } from './store/derivations/useWordsForView';

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
  const words = useWordsForView();
  const { removeWord, downloadCSV, onTagSelectChange } = useSavedWordsMutations();
  const tagCounts = useTagCounts();
  const allTagsMostPopular = Object.keys(tagCounts).sort((tag) => -tagCounts[tag]);
  useLoadSavedWords();
  return (
    <SaveWordsPageStyles>
      <Button onClick={downloadCSV}>Export CSV</Button>
      <Table>
        <Thead>
          <TRHeader>
            <TD>Actions</TD>
            <TD>Word</TD>
            <TD>Translation</TD>
            <TD>Date added</TD>
            <TD>Tags</TD>
            <TD>Context</TD>
          </TRHeader>
          <TR>
            <TD></TD>
            <TD></TD>
            <TD></TD>
            <TD></TD>
            <TD>
              <Select
                classNamePrefix="react-select"
                className="react-select-container"
                options={allTagsMostPopular.map((tag) => ({ value: tag, label: tag }))}
                isMulti
                isClearable={false}
                onChange={onTagSelectChange}
              />
            </TD>
            <TD></TD>
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
              <TD>
                {word.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TD>
              <TD><WordContext>{word.context}</WordContext></TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </SaveWordsPageStyles>
  );
};

export default SavedWordsPage;
