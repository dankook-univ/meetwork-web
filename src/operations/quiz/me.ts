import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { QuizResult } from '@/domain/quiz/result';

export const me = (quizId: string): Promise<QuizResult> => {
  return instance
    .get<AxiosError, AxiosResponse<QuizResult>>(`/api/quiz/result/me/${quizId}`)
    .then((res) => {
      return res.data;
    });
};
