import { CardProps } from '../Card';
import { ArticleComment } from '../../types/ArticleComment';

export type Props = CardProps & {
  comment: ArticleComment;
  onCommentsChange: (newState) => void;
}
