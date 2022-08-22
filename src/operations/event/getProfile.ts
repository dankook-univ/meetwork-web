import { Profile } from '@/domain/user/profile';
import { instance } from '@/config/axios';

export const getProfile = (eventId: string): Promise<Profile> => {
  return instance.get(`/api/event/me/${eventId}`).then((res) => {
    return res.data;
  });
};