import { instance } from '@/config/axios';
import { AxiosError, AxiosResponse } from 'axios';

export const count = (quizId: string): Promise<number> => {
  return instance
    .get<AxiosError, AxiosResponse<number>>(`/api/quiz/count/${quizId}`)
    .then((res) => {
      return res.data;
    });
};
