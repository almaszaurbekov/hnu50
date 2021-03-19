import { createElement, FC } from 'react';

import { Props } from './props';

export const Anchor: FC<Props> = ({ children, ...rest }: Props) =>
  createElement('a', rest, children);
