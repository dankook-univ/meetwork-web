import AuthApi from '@/operations/auth';
import ChatApi from '@/operations/chat';
import EventApi from '@/operations/event';
import UserApi from '@/operations/user';

export const MeetworkApi = {
  auth: AuthApi,
  chat: ChatApi,
  event: EventApi,
  user: UserApi,
};
