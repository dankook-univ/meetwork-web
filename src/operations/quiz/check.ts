import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';

import { CheckQuizProps } from '@/pages/api/quiz/check';

export const check = (props: CheckQuizProps): Promise<boolean> => {
  return instance
    .post<AxiosError, AxiosResponse<boolean>>(`/api/quiz/check`, props)
    .then((res) => {
      return res.data;
    });
};
