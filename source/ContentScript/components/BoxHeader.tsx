import styled from "styled-components";
import { gaps } from "../settings/box";
import { colors } from "../settings/colors";
import { DragStyled } from "./icons/Drag";

export const BoxHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.border};
  padding-bottom: ${gaps.boxPadding}px;
  margin-bottom: ${gaps.boxPadding}px;
  margin-right: -${gaps.boxPadding}px;
  margin-left: -${gaps.boxPadding}px;
  padding-right: ${gaps.boxPadding}px;
  padding-left: ${gaps.boxPadding}px;
  ${DragStyled} {
    cursor: move;
    margin-right: ${gaps.boxPadding}px;
  }
`;