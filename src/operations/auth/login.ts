import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

import { LoginProps } from '@/pages/api/auth/login';

export const login = ({
  token,
  type,
}: LoginProps): Promise<AxiosResponse<Token>> => {
  return instance.post<AxiosError, AxiosResponse<Token>>('/api/auth/login', {
    token,
    type,
  });
};
