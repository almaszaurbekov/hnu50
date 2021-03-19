import styled from '@emotion/styled';

import { colors } from '../../../core';
import { Props } from './props';

export const MockBackground = styled.div<Props>`
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #282828;
  ${({ background, color }: Props) => `
    background-color: ${background};
    color: ${color};
  `}
`;

MockBackground.defaultProps = {
  background: colors.globalBg,
  color: colors.textColor,
};
