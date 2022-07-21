import styled from "styled-components";
import { colors } from "../../settings/colors";

export const Table = styled.table`
  border-collapse: collapse;
  .react-select-container {
    min-width: 120px;
  }
  .react-select__multi-value__remove {
    padding: 0;
    order: 0;
  }
  .react-select__multi-value__label {
    padding: 2px 4px;
    order: 1;
  }
  .react-select__dropdown-indicator {
    padding: 0;
  }
  .react-select__multi-value {
    min-width: 68px;
  }
  .react-select__value-container {
    padding: 0 4px;
    flex-direction: column;
    align-items: stretch;
  }
  .react-select__control {
    min-height: 30px;
  }
  .react-select__input-container {
    /* flex-basis: 100%; */
  }
  .react-select__placeholder {
    display: flex;
    align-items: center;
  }
`;

export const Thead = styled.thead`
  
`;

export const TBody = styled.tbody`
  
`;

export const TR = styled.tr`
`;

type TDProps = {
  even?: boolean;
}
export const TD = styled.td<TDProps>`
  padding: 8px;
  background-color: ${colors.primaryBgLightest};
  border-bottom: 2px solid ${colors.primaryBorderLight};
  &:nth-child(even) {
    background-color: ${colors.bgMain};
  }
`;

export const TRHeader = styled(TR)`
  ${TD} {
    background-color: ${colors.primary};
    border-bottom: none;
  }
`;
