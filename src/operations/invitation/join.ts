import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';

import { JoinEventProps } from '@/pages/api/invitation/join/[id]';

export const join = (
  eventId: string,
  { nickname, bio, profileImage }: JoinEventProps,
): Promise<boolean> => {
  const form = new FormData();

  form.append('nickname', nickname);
  if (bio) form.append('bio', bio);
  if (profileImage) form.append('profileImage', profileImage);

  return instance
    .patch<AxiosError, AxiosResponse<boolean>>(
      `/api/invitation/join/${eventId}`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    .then((res) => {
      return res.data;
    });
};
