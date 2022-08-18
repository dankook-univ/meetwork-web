import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { ChatMessage } from '@/domain/chat/chat-message';

export const getMessages = (
  eventId: string,
  roomId: string,
): Promise<ChatMessage[]> => {
  return instance
    .get<AxiosError, AxiosResponse<ChatMessage[]>>(
      `/api/chat/${eventId}/${roomId}/messages`,
    )
    .then((res) => {
      return res.data;
    });
};
