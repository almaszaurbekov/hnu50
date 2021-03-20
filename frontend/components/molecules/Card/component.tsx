import styled from '@emotion/styled';

import { Props } from './props';

export const Card = styled.div<Props>`
  ${({ background, color, disableBorder, borderColor, theme }) => `
      background-color: ${background || theme.darkBg};
      color: ${color || theme.textColor};
      border-radius: 15px;
      ${disableBorder || `border: 1px solid ${borderColor || theme.greyBorder}`};
   `}
`;
