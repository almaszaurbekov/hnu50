import { AnchorButton, AnchorButtonProps } from '../../../../atoms/AnchorButton';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const DropdownItem = styled(AnchorButton)<AnchorButtonProps>`
  ${
    ({ theme }) => css`
      display: block;
      width: 100%;
      font-size: 15px;
      font-weight: 500;
      padding: 3px 0;
      color: #fff;
      transition: color 0.2s;
      &:hover {
        color: rgba(255,255,255,.7);
      }
    `
  }`;

