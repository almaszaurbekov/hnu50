import { ButtonHTMLAttributes } from 'react';

import { ColorProps } from '../../../core/colors';

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly isActive?: boolean;
  readonly background?: string;
  readonly backgroundActive?: string;
  readonly theme?: ColorProps;
};
