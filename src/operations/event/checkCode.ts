import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';

export const checkCode = (code: string): Promise<boolean> => {
  return instance
    .get<AxiosError, AxiosResponse<boolean>>(`/api/event/check/${code}`)
    .then((res) => {
      return res.data;
    });
};
