import { Core } from '@/domain/core';
import { ChatRoom } from '@/domain/chat/chat-room';
import { Profile } from '@/domain/user/profile';

export interface ChatMessage extends Core {
  room: ChatRoom;
  sender: Profile;
  message: string;
}
