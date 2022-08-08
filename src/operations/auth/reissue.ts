import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

export const reissue = (): Promise<AxiosResponse<Token>> => {
  return instance.post<AxiosError, AxiosResponse<Token>>('/api/auth/reissue');
};
