import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Event } from '@/domain/event/event';
import { CreateEventProps } from '@/pages/api/event/new';

export const create = ({
  name,
  code,
  organizerNickname,
  organizerBio,
  organizerProfileImage,
}: CreateEventProps): Promise<Event> => {
  const form = new FormData();

  form.append('name', name);
  form.append('code', code);
  form.append('organizerNickname', organizerNickname);
  if (organizerBio !== undefined)
    form.append('organizerBio', organizerBio as string);
  if (organizerProfileImage)
    form.append('organizerProfileImage', organizerProfileImage as Blob);

  return instance
    .post<AxiosError, AxiosResponse<Event>>('/api/event/new', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};
