import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { User } from '@/domain/user/user';

export const me = (): Promise<User> => {
  return instance
    .get<AxiosError, AxiosResponse<User>>('/api/user/me')
    .then((res) => {
      return res.data;
    });
};
