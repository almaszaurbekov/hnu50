import styled from '@emotion/styled';

import { Props } from './props';

export const Container = styled.div<Props>`
  position: relative;
  margin: auto;
  @media (max-width: 900px) {
    padding: 0 15px;
  }
  ${({ mini, isForm }: Props) => isForm ? 'max-width: 350px' : (mini ? 'max-width: 500px' : 'max-width: 1000px')}


`;
