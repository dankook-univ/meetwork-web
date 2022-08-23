import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';

export const refuse = (eventId: string): Promise<boolean> => {
  return instance
    .delete<AxiosError, AxiosResponse<boolean>>(
      `/api/invitation/refuse/${eventId}`,
    )
    .then((res) => {
      return res.data;
    });
};
