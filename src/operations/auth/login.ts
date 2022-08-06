import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

export interface LoginProps {
  token: string;
  type: 'kakao';
}

export const login = ({ token, type }: LoginProps) => {
  return instance.post<AxiosError, AxiosResponse<Token>>('/api/auth/login', {
    token,
    type,
  });
};
