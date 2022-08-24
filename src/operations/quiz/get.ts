import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Quiz } from '@/domain/quiz';
import { Question } from '@/domain/quiz/question';

export const get = (
  quizId: string,
): Promise<{ quiz: Quiz; questions: Question[] }> => {
  return instance
    .get<AxiosError, AxiosResponse<{ quiz: Quiz; questions: Question[] }>>(
      `/api/quiz/questions/${quizId}`,
    )
    .then((res) => {
      return res.data;
    });
};
