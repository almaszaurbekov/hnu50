import { HTMLAttributes } from 'react';
import { Article } from '../../types/Article';

export type Props = HTMLAttributes<HTMLDivElement> & {
  articles: ReadonlyArray<Article>;
};
