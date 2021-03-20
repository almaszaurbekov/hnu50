import { Props } from './props';

const colorsBase = {
  accentBlue: '#3B8590',
  accentBlueHover: '#038d90',
  accentOrange: '#E78B1E',
  accentOrangeHover: '#c37518',
  blockShadow: '0 10px 10px -7px rgba(0,0,0,.1)',
  blockShadowWide: '0 5px 25px -4px rgba(0,0,0,.4)',
  greyBorder: "#e6e6e6",
  greyText: "#797979"
};

export const colorsLight: Props = {
  ...colorsBase,
  theme: 'light',
  globalBg: '#fff',
  darkBg: '#04A3A6',
  lightBg: '#fff',
  textColor: '#282828',
};

export const colors: Props = {
  ...colorsBase,
  theme: 'dark',
  globalBg: '#060815',
  darkBg: '#0c0f1f',
  lightBg: '#22273e',
  textColor: '#fff',
};
