import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

import { SignUpProps } from '@/pages/api/auth/new';

export const signUp = (props: SignUpProps): Promise<AxiosResponse<Token>> => {
  return instance.post<AxiosError, AxiosResponse<Token>, SignUpProps>(
    '/api/auth/new',
    props,
  );
};
