import { Props } from './props';

const colorsBase = {
  accentBlue: 'blue',
  accentBlueHover: '#0000af',
  blockShadow: '0 10px 10px -7px rgba(0,0,0,.1)',
  greyBorder: "#e6e6e6",
  greyText: "#797979"
};

export const colorsLight: Props = {
  ...colorsBase,
  theme: 'light',
  globalBg: '#fff',
  darkBg: '#efefef',
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
