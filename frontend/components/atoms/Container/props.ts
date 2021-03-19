import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  readonly mini?: boolean;
  readonly isForm?: boolean;
};
