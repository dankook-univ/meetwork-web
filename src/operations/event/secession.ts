import { instance } from '@/config/axios';
import { AxiosError, AxiosResponse } from 'axios';

export const secession = (eventId: string): Promise<boolean> => {
  return instance
    .delete<AxiosError, AxiosResponse<boolean>>(
      `/api/event/secession/${eventId}`,
    )
    .then((res) => {
      return res.data;
    });
};
