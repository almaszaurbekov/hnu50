import '@emotion/react';
import { ColorProps } from './core';

declare module '@emotion/react' {
  export interface Theme extends ColorProps {}
}
