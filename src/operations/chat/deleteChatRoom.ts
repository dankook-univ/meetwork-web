import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { ChatRoom } from '@/domain/chat/chat-room';

export const deleteChatRoom = (
  eventId: string,
  roomId: string,
): Promise<ChatRoom> => {
  return instance
    .delete<AxiosError, AxiosResponse<ChatRoom>>(
      `/api/chat/${eventId}/${roomId}`,
    )
    .then((res) => {
      return res.data;
    });
};
