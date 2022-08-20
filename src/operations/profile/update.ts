import { AxiosError, AxiosResponse } from 'axios';

import { ProfileUpdateProps } from '@/pages/api/profile/update';
import { Profile } from '@/domain/user/profile';
import { instance } from '@/config/axios';

export const update = ({
  profileId,
  nickname,
  bio,
  profileImage,
  isProfileImageDeleted,
}: ProfileUpdateProps): Promise<Profile> => {
  const form = new FormData();

  form.append('profileId', profileId);
  form.append('nickname', nickname);
  if (bio) form.append('bio', bio);
  if (profileImage) form.append('profileImage', profileImage as Blob);
  form.append('isProfileImageDeleted', `${isProfileImageDeleted}`);

  return instance
    .patch<AxiosError, AxiosResponse<Profile>>(`/api/profile/update`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};
