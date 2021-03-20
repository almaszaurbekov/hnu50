import { User } from '../components/types/User';

export type Specialization = {
  id: number;
  name: string;
  image: string;
  description: string;
}

// Profile page
export type Profile = {
  user: User;
  recent_results: Specialization[];
  interests: string[];
}
