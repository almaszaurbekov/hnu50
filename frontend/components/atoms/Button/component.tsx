import styled from '@emotion/styled';
import React, { FC } from 'react';

import { Props } from './props';
import { css } from '@emotion/react';

const IconWrapper = styled.div<Pick<Props, 'iconLeft'>>`
  position: absolute;
  opacity: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: right 0.2s, opacity 0.2s, left 0.2s;
  will-change: transition, opacity;
  button:hover & {
    opacity: 1;
  }
  ${({ iconLeft }) => iconLeft ? css`
    right: -20px;
    button:hover & {
      right: 20px;
    }
  ` : css`
    left: -20px;
    button:hover & {
      left: 20px;
    }
  `}
`;

const ButtonBase: FC<Props> = ({ icon, iconLeft, children, theme: _a, ...rest }: Props) => (
  <button {...rest}>
    {iconLeft && <IconWrapper>{icon}</IconWrapper>}
    {children}
    {!iconLeft && <IconWrapper>{icon}</IconWrapper>}
  </button>
);

export const Button = styled(ButtonBase)<Pick<Props, 'theme' | 'icon' | 'iconLeft'>>`
  position: relative;
  background: ${({ theme }) => theme.accentBlue};
  display: inline-block;
  color: #fff;
  border: none;
  border-radius: 100px;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  padding: 20px 30px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  overflow: hidden;
  transition: background 0.2s, padding-right 0.2s, opacity 0.2s, padding-left 0.2s;
  will-change: background, padding-right, opacity, padding-left;
  &:hover {
    background: ${({ theme }) => theme.accentBlueHover};
    ${({ icon, iconLeft }) =>
      icon && (
        iconLeft ?
          css`
            padding-left: 50px;
            padding-right: 25px;
          ` :
          css`
            padding-right: 55px;
            padding-left: 25px;
          `
      )}
  }
  &:active {
    opacity: 0.8;
  }
`;
