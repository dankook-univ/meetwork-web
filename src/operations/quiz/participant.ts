import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Question } from '@/domain/quiz/question';

export const participant = (quizId: string): Promise<Question[]> => {
  return instance
    .get<AxiosError, AxiosResponse<Question[]>>(
      `/api/quiz/participant/${quizId}`,
    )
    .then((res) => {
      return res.data;
    });
};
