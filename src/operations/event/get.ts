import { Event } from '@/domain/event/event';
import { instance } from '@/config/axios';

export const get = (eventId: string): Promise<Event> => {
  return instance.get(`/api/event/${eventId}`).then((res) => {
    return res.data;
  });
};
