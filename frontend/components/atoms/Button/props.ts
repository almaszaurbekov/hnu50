import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { ButtonHTMLAttributes, ReactElement } from 'react';

import { ColorProps } from '../../../core/colors';

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly theme?: ColorProps;
  readonly icon?: ReactElement<FontAwesomeIconProps>;
  readonly iconLeft?: boolean;
};
