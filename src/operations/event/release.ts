import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { ReleaseEventProps } from '@/pages/api/event/release';

export const release = (props: ReleaseEventProps): Promise<boolean> => {
  return instance
    .post<AxiosError, AxiosResponse<boolean>>('/api/event/release', props)
    .then((res) => {
      return res.data;
    });
};
