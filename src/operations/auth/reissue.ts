import { AxiosError, AxiosResponse } from 'axios';

import { localInstance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

export const reissue = () => {
  return localInstance.post<AxiosError, AxiosResponse<Token>>(
    '/api/auth/reissue',
  );
};
