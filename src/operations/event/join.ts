import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Event } from '@/domain/event/event';

import { JoinEventWithCodeProps } from '@/pages/api/event/join/[code]';

export const join = (
  code: string,
  { nickname, bio, profileImage }: JoinEventWithCodeProps,
): Promise<Event> => {
  const form = new FormData();

  form.append('nickname', nickname);
  if (bio) form.append('bio', bio);
  if (profileImage) form.append('profileImage', profileImage);

  return instance
    .patch<AxiosError, AxiosResponse<Event>>(`/api/event/join/${code}`, form)
    .then((res) => {
      return res.data;
    });
};
