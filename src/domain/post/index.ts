import { Core } from '@/domain/core';
import { Profile } from '@/domain/user/profile';
import { Board } from '@/domain/board';
import { Comment } from '@/domain/post/comment';

export interface Post extends Core {
  content: string;
  writer: Profile;
  board: Board;
  comments: Comment[];
}
