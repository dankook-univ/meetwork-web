import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';

import { SendEmailProps } from '@/pages/api/email/[id]';

export const send = (
  eventId: string,
  props: SendEmailProps,
): Promise<string> => {
  return instance
    .post<AxiosError, AxiosResponse<string>>(`/api/email/${eventId}`, props)
    .then((res) => {
      return res.data;
    });
};
