import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import withProps from "recompose/withProps";
import { css } from '@emotion/react';

export const Notification = withProps({
  progressClassName: 'progress',
})(styled(ToastContainer)`
  ${({ theme }) => css`
    .Toastify__toast {
      border-radius: 15px;
      text-align: center;
    }
    .progress {
      background: rgba(255,255,255,.7);
      height: 3px;
    }
    .Toastify__toast--success {
      background: #4CAF50;
    }
  `}
`);
