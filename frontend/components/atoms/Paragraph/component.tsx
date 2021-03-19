import styled from '@emotion/styled';
import { Props } from './props';

export const Paragraph = styled.p<Props>`
  color: ${({ theme }) => theme.textColor};
`;
