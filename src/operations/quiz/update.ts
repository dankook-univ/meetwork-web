import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Quiz } from '@/domain/quiz';

import { UpdateQuizProps } from '@/pages/api/quiz/[id]';

export const update = (
  quizId: string,
  props: UpdateQuizProps,
): Promise<Quiz> => {
  return instance
    .patch<AxiosError, AxiosResponse<Quiz>>(`/api/quiz/${quizId}`, props)
    .then((res) => {
      return res.data;
    });
};
