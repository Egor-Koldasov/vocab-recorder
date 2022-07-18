import styled from 'styled-components';
import { gaps } from '../settings/box';

export const BoxContent = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 ${gaps.boxPadding}px;
`;
