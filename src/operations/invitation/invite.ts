import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { InviteProps } from '@/pages/api/invitation/new';

export const invite = (props: InviteProps): Promise<boolean> => {
  return instance
    .post<AxiosError, AxiosResponse<boolean>>('/api/invitation/new', props)
    .then((res) => {
      return res.data;
    });
};
