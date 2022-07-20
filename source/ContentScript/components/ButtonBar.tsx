import styled from "styled-components";
import { gaps } from "../../settings/box";

export const ButtonBar = styled.div`
  display: flex;
  padding: ${gaps.boxPadding}px;
  gap: ${gaps.btnMarginX}px;
`;