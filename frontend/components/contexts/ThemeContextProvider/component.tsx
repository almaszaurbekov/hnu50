import React, { FC } from 'react';
import { ThemeProvider } from '@emotion/react';
import { useAtom } from '@reatom/react';
import { themeAtom } from '../../../store/themeAtom';
import { colors, colorsLight } from '../../../core';

export const ThemeContextProvider: FC = ({ children }) => {
  const themeName = useAtom(themeAtom);

  return (
    <ThemeProvider theme={themeName === "light" ? colorsLight : colors }>
      {children}
    </ThemeProvider>
  );
}
