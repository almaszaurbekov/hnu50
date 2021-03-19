import { HTMLAttributes } from 'react';

export type Props = Omit<HTMLAttributes<HTMLHRElement>, 'height'> & {
  readonly size?: number;
  readonly color?: string;
  readonly dashed?: boolean;
};
