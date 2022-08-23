import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';

export const deleteEvent = (eventId: string): Promise<boolean> => {
  return instance
    .delete<AxiosError, AxiosResponse<boolean>>(`/api/event/${eventId}`)
    .then((res) => {
      return res.data;
    });
};
