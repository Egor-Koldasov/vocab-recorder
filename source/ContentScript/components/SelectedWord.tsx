import styled from 'styled-components';
import { colors } from '../../settings/colors';
import { font } from '../../settings/font';

export const SelectedWord = styled.input`
  font-weight: bold;
  font-size: ${font.lg1}px;
  background-color: transparent;
  padding: 0 4px;
  flex-grow: 1;
  border: 1px solid transparent;
  color: ${colors.textHeader};
  &:focus {
    outline: none;
    border: 1px solid ${colors.textHeader};
  }
`;
