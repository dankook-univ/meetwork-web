import { AxiosError, AxiosResponse } from 'axios';

import { localInstance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

import { SignUpProps } from '@/pages/api/auth/new';

export const signUp = (props: SignUpProps): Promise<AxiosResponse<Token>> => {
  return localInstance.post<AxiosError, AxiosResponse<Token>, SignUpProps>(
    '/api/auth/new',
    props,
  );
};
