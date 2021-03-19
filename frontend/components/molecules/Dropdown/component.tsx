import Tippy from '@tippyjs/react';
import React, { FC } from 'react';
import { Props } from './props';

export const Dropdown: FC<Props> = ({ button, children, trigger, ...rest }: Props) => {
  return (
    <Tippy
      css={{
        outline: "none"
      }}
      content={children}
      interactive
      trigger={trigger === 'hover' ? 'mouseenter' : 'click'}
      {...rest}
    >
      {button}
    </Tippy>
  );
};

Dropdown.defaultProps = {
  trigger: 'hover',
  placement: 'bottom-start',
  offset: [0, 0],
};
