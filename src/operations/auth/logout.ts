import { AxiosError, AxiosResponse } from 'axios';

import { localInstance } from '@/config/axios';

export const logout = (): Promise<AxiosResponse<boolean>> => {
  return localInstance.put<AxiosError, AxiosResponse<boolean>>(
    '/api/auth/logout',
  );
};
