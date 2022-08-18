import { createRoom } from '@/operations/chat/createRoom';
import { getParticipantChatRooms } from '@/operations/chat/getParticipantChatRooms';

const ChatApi = {
  createRoom,
  getParticipantChatRooms,
};

export default ChatApi;
