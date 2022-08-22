import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { ChatRoom } from '@/domain/chat/chat-room';

export const list = (eventId: string): Promise<ChatRoom[]> => {
  return instance
    .get<AxiosError, AxiosResponse<ChatRoom[]>>(`/api/chat/${eventId}`)
    .then((res) => {
      return res.data;
    });
};
