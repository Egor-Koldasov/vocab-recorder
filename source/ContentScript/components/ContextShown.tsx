import React, { ComponentProps } from "react";
import styled from "styled-components";
import { colors } from "../../settings/colors";


export const ContextShownStyled = styled.textarea`
  background-color: ${colors.bgTextBox};
  color: ${colors.textMain};
  flex-grow: 1;
`;

export const ContextShown = (props: ComponentProps<typeof ContextShownStyled>) => {
  return (
    <ContextShownStyled {...props} />
  );
};
