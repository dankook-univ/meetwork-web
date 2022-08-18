import { Board } from '@/domain/board';
import { instance } from '@/config/axios';

export const list = (eventId: string): Promise<Board[]> => {
  return instance.get(`/api/board/${eventId}`).then((res) => {
    return res.data;
  });
};