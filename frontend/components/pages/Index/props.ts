import locales from '../../../core/locales';
import { Article } from '../../types/Article';

export type Props = {
  language: typeof locales;
  articles: ReadonlyArray<Article>;
}
