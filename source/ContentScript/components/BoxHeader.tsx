import styled from "styled-components";
import { gaps } from "../../settings/box";
import { colors } from "../../settings/colors";
import { DragStyled } from "./icons/Drag";

export const BoxHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.border};
  padding: ${gaps.boxPadding}px;
  background-color: ${colors.border};
  border-radius: 5px 5px 0 0;
  margin: -2px;
  margin-bottom: ${gaps.boxPadding}px;
  color: ${colors.textHeader};
  align-items: center;
  ${DragStyled} {
    cursor: move;
    margin-right: ${gaps.boxPadding}px;
  }
`;