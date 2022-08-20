import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Profile } from '@/domain/user/profile';

export const members = (eventId: string, page: number): Promise<Profile[]> => {
  return instance
    .get<AxiosError, AxiosResponse<Profile[]>>(
      `/api/event/members/${eventId}?page=${page}`,
    )
    .then((res) => {
      return res.data;
    });
};
