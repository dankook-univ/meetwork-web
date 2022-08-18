import AuthApi from '@/operations/auth';
import BoardApi from '@/operations/board';
import ChatApi from '@/operations/chat';
import EventApi from '@/operations/event';
import UserApi from '@/operations/user';

export const MeetworkApi = {
  auth: AuthApi,
  board: BoardApi,
  chat: ChatApi,
  event: EventApi,
  user: UserApi,
};
