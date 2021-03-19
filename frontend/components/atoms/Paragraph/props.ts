import { HTMLAttributes } from 'react';
import { ColorProps } from '../../../core/colors';

export type Props = HTMLAttributes<HTMLDivElement> & {
  theme?: ColorProps;
};
