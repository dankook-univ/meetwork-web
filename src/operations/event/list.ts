import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Event } from '@/domain/event/event';

export const list = (page: number): Promise<Event[]> => {
  return instance
    .get<AxiosError, AxiosResponse<Event[]>>(`/api/event/list?page=${page}`)
    .then((res) => {
      return res.data;
    });
};
