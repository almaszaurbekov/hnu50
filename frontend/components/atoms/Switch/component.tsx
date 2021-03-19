import styled from '@emotion/styled';
import classNames from 'classnames';
import * as React from 'react';
import { FC } from 'react';

import { Props } from './props';

const SwitchCircle = styled.i<Pick<Props, 'theme'>>`
  display: block;
  height: 25px;
  width: 25px;
  background: #386de2;
  border-radius: 100%;
  box-shadow: ${({ theme }) => theme.blockShadow};
  transform: scale(1.1);
  transition: transform 0.2s, background 0.2s;
`;

const SwitchBase: FC<Props> = ({
  className,
  isActive,
  theme: _a,
  background: _b,
  backgroundActive: _c,
  ...rest
}: Props) => {
  const isActiveClass = isActive ? 'active' : '';
  return (
    <button className={classNames(className, isActiveClass, 'theme-switcher')} {...rest}>
      <SwitchCircle className="theme-switcher__circle" />
    </button>
  );
};

export const Switch = styled(SwitchBase)<Props>`
  display: block;
  border: 0;
  padding: 0;
  width: 50px;
  border-radius: 100px;
  cursor: pointer;
  outline: none;
  transition: background 0.2s;
  &.active .theme-switcher__circle {
    background: #fff;
    transform: translateX(100%) scale(1.2);
  }
  ${({ background, backgroundActive }: Props) => `
    background: ${background};
    &.active {
      background: ${backgroundActive};
    }
  `}
`;

Switch.defaultProps = {
  background: '#091225',
  backgroundActive: '#e8c133',
};
