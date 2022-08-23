import AuthApi from '@/operations/auth';
import BoardApi from '@/operations/board';
import ChatApi from '@/operations/chat';
import EventApi from '@/operations/event';
import FileApi from '@/operations/file';
import InvitationApi from '@/operations/invitation';
import PostApi from '@/operations/post';
import ProfileApi from '@/operations/profile';
import UserApi from '@/operations/user';

export const MeetworkApi = {
  auth: AuthApi,
  board: BoardApi,
  chat: ChatApi,
  event: EventApi,
  file: FileApi,
  invitation: InvitationApi,
  post: PostApi,
  profile: ProfileApi,
  user: UserApi,
};
