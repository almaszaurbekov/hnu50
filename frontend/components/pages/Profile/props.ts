import locales from '../../../core/locales';
import { Profile } from '../../../core/mock';

export type Props = {
  language: typeof locales;
} & Profile;
