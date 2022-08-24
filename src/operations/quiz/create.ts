import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Quiz } from '@/domain/quiz';

import { CreateQuizProps } from '@/pages/api/quiz/new';

export const create = (props: CreateQuizProps): Promise<Quiz> => {
  return instance
    .post<AxiosError, AxiosResponse<Quiz>>('/api/quiz/new', props)
    .then((res) => {
      return res.data;
    });
};
