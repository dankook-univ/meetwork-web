import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { CreateChatRoomProps } from '@/pages/api/chat/[id]/new';
import { ChatRoom } from '@/domain/chat/chat-room';

export const createRoom = (
  eventId: string,
  data: CreateChatRoomProps,
): Promise<ChatRoom> => {
  return instance
    .post<AxiosError, AxiosResponse<ChatRoom>>(`/api/chat/${eventId}/new`, data)
    .then((res) => {
      return res.data;
    });
};
