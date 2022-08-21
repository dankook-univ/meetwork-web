import { createRoom } from '@/operations/chat/createRoom';
import { deleteChatRoom } from '@/operations/chat/deleteChatRoom';
import { getChatRoom } from '@/operations/chat/getChatRoom';
import { getMessages } from '@/operations/chat/getMessages';
import { getParticipantChatRooms } from '@/operations/chat/getParticipantChatRooms';
import { join } from '@/operations/chat/join';
import { list } from '@/operations/chat/list';
import { sendMessage } from '@/operations/chat/sendMessage';
import { update } from '@/operations/chat/update';

const ChatApi = {
  createRoom,
  delete: deleteChatRoom,
  getChatRoom,
  getMessages,
  getParticipantChatRooms,
  join,
  list,
  sendMessage,
  update,
};

export default ChatApi;
