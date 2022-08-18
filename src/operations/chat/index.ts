import { createRoom } from '@/operations/chat/createRoom';
import { getChatRoom } from '@/operations/chat/getChatRoom';
import { getMessages } from '@/operations/chat/getMessages';
import { getParticipantChatRooms } from '@/operations/chat/getParticipantChatRooms';
import { sendMessage } from '@/operations/chat/sendMessage';

const ChatApi = {
  createRoom,
  getChatRoom,
  getMessages,
  getParticipantChatRooms,
  sendMessage,
};

export default ChatApi;
