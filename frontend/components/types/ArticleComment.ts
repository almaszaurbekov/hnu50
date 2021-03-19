import { Article } from './Article';
import { User } from './User';

export type ArticleComment = {
  id?: number;
  content?: string;

  post?: Article;
  post_id?: number;
  user?: User;
  user_id?: number;

  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}
