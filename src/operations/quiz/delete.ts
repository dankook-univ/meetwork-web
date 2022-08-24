import { instance } from '@/config/axios';
import { AxiosError, AxiosResponse } from 'axios';

export const deleteQuiz = (quizId: string): Promise<boolean> => {
  return instance
    .delete<AxiosError, AxiosResponse<boolean>>(`/api/quiz/${quizId}`)
    .then((res) => {
      return res.data;
    });
};
