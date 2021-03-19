import { AnchorButton, AnchorButtonProps } from '../../../../atoms/AnchorButton';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const DropdownItem = styled(AnchorButton)<AnchorButtonProps>`
  ${
    ({ theme }) => css`
      display: block;
      width: 100%;
      font-size: 13px;
      font-weight: 400;
      padding: 3px 0;
      color: ${theme.textColor};
      transition: color 0.2s;
      &:hover {
        color: ${theme.accentBlue};
      }
    `
  }`;

