import { AnchorButton, AnchorButtonProps } from '../../../../atoms/AnchorButton';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ForwardedRef, forwardRef } from 'react';

export const NavigationItem = styled(AnchorButton)<AnchorButtonProps & { ref?: ForwardedRef<unknown> }>`
  ${
    ({ theme }) => css`
      font-size: 13px;
      font-weight: 500;
      padding: 0 8px;
      color: ${theme.textColor};
      transition: color 0.2s, transform 0.2s;
      &:hover {
        color: ${theme.accentBlue};
        transform: translateY(-2px);
      }
    `
  }`;

