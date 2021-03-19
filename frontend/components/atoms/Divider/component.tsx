import styled from '@emotion/styled';

import { Props } from './props';
import { css } from '@emotion/react';

export const Divider = styled.hr<Props>`
  ${({ color, size, dashed, theme }) => css`
    display: block;
    margin: 0;
    background: transparent;
    width: 100%;
    height: 0;
    border-width: 0;
    border-bottom: ${size || 1}px ${dashed ? 'dashed' : 'solid'} ${color || theme.greyBorder};
  `}
`;
