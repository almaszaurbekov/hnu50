import { declareAction, declareAtom } from '@reatom/core';

export const changeLanguage = declareAction<string>();
export const languageAtom = declareAtom('ru', on => [on(changeLanguage, (state, payload) => payload)]);
