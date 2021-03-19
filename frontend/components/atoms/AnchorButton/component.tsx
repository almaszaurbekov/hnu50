import styled from '@emotion/styled';
import { createElement, FC } from 'react';

import { Props } from './props';
import { css } from '@emotion/react';

const AnchorButtonBase: FC<Props> = ({ children, ...rest }: Props) =>
  createElement('button', rest, children);

export const AnchorButton = styled(AnchorButtonBase)`
  ${({ theme }) => css`
    background: transparent;
    outline: none;
    cursor: pointer;
    border: none;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    text-align: left;
    padding: 0;
    transition: color 0.2s;
    &:hover {
      color: ${theme.accentBlue};
    }
  `}
`;
