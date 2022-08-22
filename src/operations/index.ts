import AuthApi from '@/operations/auth';
import BoardApi from '@/operations/board';
import ChatApi from '@/operations/chat';
import EventApi from '@/operations/event';
import InvitationApi from '@/operations/invitation';
import ProfileApi from '@/operations/profile';
import UserApi from '@/operations/user';

export const MeetworkApi = {
  auth: AuthApi,
  board: BoardApi,
  chat: ChatApi,
  event: EventApi,
  invitation: InvitationApi,
  profile: ProfileApi,
  user: UserApi,
};
