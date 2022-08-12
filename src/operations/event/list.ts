import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Event } from '@/domain/event/event';

export const list = (): Promise<Event[]> => {
  return instance
    .get<AxiosError, AxiosResponse<Event[]>>('/api/event/list')
    .then((res) => {
      return res.data;
    });
};
