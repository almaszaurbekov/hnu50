import { HTMLAttributes } from 'react';
import { ColorProps } from '../../../core';

import { Elements } from './types/headings';

export type Props = HTMLAttributes<HTMLHeadingElement> & {
  readonly as: keyof Elements;
  readonly color?: string;
  readonly theme?: ColorProps;
};
