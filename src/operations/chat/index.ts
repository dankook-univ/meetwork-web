import { createRoom } from '@/operations/chat/createRoom';
import { getChatRoom } from '@/operations/chat/getChatRoom';
import { getMessages } from '@/operations/chat/getMessages';
import { getParticipantChatRooms } from '@/operations/chat/getParticipantChatRooms';
import { join } from '@/operations/chat/join';
import { list } from '@/operations/chat/list';
import { sendMessage } from '@/operations/chat/sendMessage';

const ChatApi = {
  createRoom,
  getChatRoom,
  getMessages,
  getParticipantChatRooms,
  join,
  list,
  sendMessage,
};

export default ChatApi;
