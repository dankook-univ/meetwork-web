import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Profile } from '@/domain/user/profile';

export const member = (eventId: string, memberId: string): Promise<Profile> => {
  return instance
    .get<AxiosError, AxiosResponse<Profile>>(
      `/api/event/member/${eventId}/${memberId}`,
    )
    .then((res) => {
      return res.data;
    });
};
