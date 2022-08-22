import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { ChatRoom } from '@/domain/chat/chat-room';

export const join = (eventId: string, roomId: string): Promise<ChatRoom> => {
  return instance
    .post<AxiosError, AxiosResponse<ChatRoom>>(
      `/api/chat/${eventId}/${roomId}/join`,
    )
    .then((res) => {
      return res.data;
    });
};