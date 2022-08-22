import { Event } from '@/domain/event/event';
import { instance } from '@/config/axios';
import { UpdateEventProps } from '@/pages/api/event/[id]';

export const update = (
  eventId: string,
  props: UpdateEventProps,
): Promise<Event> => {
  return instance.patch(`/api/event/${eventId}`, props).then((res) => {
    return res.data;
  });
};