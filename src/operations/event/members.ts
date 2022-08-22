import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Profile } from '@/domain/user/profile';

export const members = (
  eventId: string,
  page: number,
  adminOnly?: boolean,
): Promise<Profile[]> => {
  return instance
    .get<AxiosError, AxiosResponse<Profile[]>>(
      `/api/event/members/${eventId}?page=${page}${
        adminOnly !== undefined ? '&adminOnly=' + adminOnly : ''
      }`,
    )
    .then((res) => {
      return res.data;
    });
};
