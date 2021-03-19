import { TippyProps } from '@tippyjs/react';
import { Optional } from 'utility-types';

export type Props = Optional<Omit<TippyProps, 'content' | 'children' | 'trigger'>> & {
  readonly button: TippyProps['children'];
  readonly children: TippyProps['content'];
  readonly trigger?: 'hover' | 'click';
};
