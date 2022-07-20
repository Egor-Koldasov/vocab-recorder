import styled from 'styled-components';
import { gaps } from '../../settings/box';

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${gaps.boxPadding}px;
`;
export const BoxContentRow = styled.div`
  display: flex;
  gap: 8px;
`;
