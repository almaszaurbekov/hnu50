import styled from '@emotion/styled';
import { createElement, FC } from 'react';

import { Props } from './props';

const HeadingBase: FC<Props> = ({ as, color: _a, children, ...rest }: Props) =>
  createElement(as, rest, children);

export const Heading = styled(HeadingBase)`
  color: ${({ color, theme }) => color || theme.textColor};
`;
