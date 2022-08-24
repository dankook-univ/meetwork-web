import { Core } from '@/domain/core';
import { Profile } from '@/domain/user/profile';
import { Quiz } from '@/domain/quiz/index';

export interface QuizResult extends Core {
  quiz: Quiz;
  profile: Profile;
  count: number;
}
