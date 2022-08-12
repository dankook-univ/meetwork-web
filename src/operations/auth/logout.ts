import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';

export const logout = (): Promise<AxiosResponse<boolean>> => {
  return instance.put<AxiosError, AxiosResponse<boolean>>('/api/auth/logout');
};
