import styled from "styled-components";
import { gaps } from "../settings/box";
import { colors } from "../settings/colors";
import { font } from "../settings/font";

export const Button = styled.button.attrs({ type: 'button' })`
  border-radius: 5px;
  border: 1px solid ${colors.textMain};
  padding: ${gaps.buttonY}px ${gaps.buttonX}px;
  font-size: ${font.base};
`;