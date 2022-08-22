import { instance } from '@/config/axios';

import { SendMessageProps } from '@/pages/api/chat/[id]/[roomId]/message/new';
import { ChatMessage } from '@/domain/chat/chat-message';

export const sendMessage = (
  eventId: string,
  roomId: string,
  props: SendMessageProps,
): Promise<ChatMessage> => {
  return instance
    .post(`/api/chat/${eventId}/${roomId}/message/new`, props)
    .then((res) => {
      return res.data;
    });
};
