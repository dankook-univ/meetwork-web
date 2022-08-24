import { Core } from '@/domain/core';
import { Quiz } from '@/domain/quiz/index';

export interface Question extends Core {
  answer: string;
  choice: string[];
  content: string;
  quiz: Quiz;
}
