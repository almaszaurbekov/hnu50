import { declareAction, declareAtom } from '@reatom/core';

export const changeTheme = declareAction<string>();
export const themeAtom = declareAtom('light', on => [on(changeTheme, (state, payload) => payload)]);
