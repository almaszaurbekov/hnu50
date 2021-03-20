import React, { FC } from 'react';
import { useTheme } from '@emotion/react';
import { Container } from '../../atoms/Container';

export const Footer: FC = () => {
  const theme = useTheme();

  return (
    <div className="pt-5">
      <Container className="d-flex align-items-center py-3" css={{ borderTop: `1px solid ${theme.greyBorder}` }}>
        <span css={{ fontSize: 13, color: theme.greyText }}>ⓒ 2021 Designed by HNU50 — Dev Team | All rights reserved</span>
        <div css={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <img css={{ height: 15, padding: "0 5px" }} src="/fb.png"/>
          <img css={{ height: 16, padding: "0 5px" }} src="/google.png"/>
          <img css={{ height: 16, padding: "0 5px" }} src="/inst.png"/>
          <img css={{ height: 21, padding: "0 3px", transform: "translateY(2px)" }} src="/rss.png"/>
        </div>
      </Container>
    </div>
  );
}
