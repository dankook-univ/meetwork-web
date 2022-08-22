import { Core } from '@/domain/core';
import { User } from '@/domain/user/user';

export interface Profile extends Core {
  nickname: string;
  bio?: string;
  member: User;
  profileImage?: {
    id: string;
    url: string;
  };
  isAdmin: boolean;
}
