import { InputHTMLAttributes, ReactElement, ReactNode } from 'react';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
}
