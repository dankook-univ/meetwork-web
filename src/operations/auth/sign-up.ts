import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

export interface SignUpProps {
  type: 'kakao';
  token: string;
  name: string;
  email: string;
}

export const signUp = ({ type, token, name, email }: SignUpProps) => {
  const form = new FormData();

  form.set('type', type);
  form.set('token', token);
  form.set('name', name);
  form.set('email', email);

  return instance.post<AxiosError, AxiosResponse<Token>, FormData>(
    '/api/auth/new',
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
