import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { User } from '@/domain/user/user';

export const me = () => {
  return instance.get<AxiosError, AxiosResponse<User>>('/api/user/me');
};
