import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

export interface ReissueProps {
  accessToken: string;
  refreshToken: string;
}

export const reissue = (props: ReissueProps) => {
  return instance.post<AxiosError, AxiosResponse<Token>>(
    '/api/auth/reissue',
    props,
  );
};
