import { HTMLAttributes } from 'react';

export type Props = Omit<HTMLAttributes<HTMLDivElement>, 'borderColor'> & {
  readonly disableBorder?: boolean;
  readonly background?: string;
  readonly color?: string;
  readonly borderColor?: string;
};
