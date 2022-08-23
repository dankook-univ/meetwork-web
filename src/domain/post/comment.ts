import { Core } from '@/domain/core';
import { Profile } from '@/domain/user/profile';

export interface Comment extends Core {
  content: string;
  writer: Profile;
}
