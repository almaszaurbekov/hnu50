import { HTMLAttributes } from 'react';

export type Props = Omit<HTMLAttributes<HTMLDivElement>, 'background'> & {
  readonly mini?: boolean;
  readonly background?: string;
  readonly colors?: string;
};
