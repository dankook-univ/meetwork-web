import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { ChatRoom } from '@/domain/chat/chat-room';

import { UpdateChatRoomProps } from '@/pages/api/chat/[id]/[roomId]';

export const update = (
  eventId: string,
  roomId: string,
  props: UpdateChatRoomProps,
): Promise<ChatRoom> => {
  return instance
    .put<AxiosError, AxiosResponse<ChatRoom>>(
      `/api/chat/${eventId}/${roomId}`,
      props,
    )
    .then((res) => {
      return res.data;
    });
};
