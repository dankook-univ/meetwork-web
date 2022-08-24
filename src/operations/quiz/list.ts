import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Quiz } from '@/domain/quiz';

export const list = (eventId: string): Promise<Quiz[]> => {
  return instance
    .get<AxiosError, AxiosResponse<Quiz[]>>(`/api/quiz/list/${eventId}`)
    .then((res) => {
      return res.data;
    });
};
