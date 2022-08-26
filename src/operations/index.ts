import AuthApi from '@/operations/auth';
import BoardApi from '@/operations/board';
import ChatApi from '@/operations/chat';
import CommentApi from '@/operations/comment';
import EmailApi from '@/operations/email';
import EventApi from '@/operations/event';
import FileApi from '@/operations/file';
import InvitationApi from '@/operations/invitation';
import PostApi from '@/operations/post';
import ProfileApi from '@/operations/profile';
import QuizApi from '@/operations/quiz';
import UserApi from '@/operations/user';

export const MeetworkApi = {
  auth: AuthApi,
  board: BoardApi,
  chat: ChatApi,
  comment: CommentApi,
  email: EmailApi,
  event: EventApi,
  file: FileApi,
  invitation: InvitationApi,
  post: PostApi,
  profile: ProfileApi,
  quiz: QuizApi,
  user: UserApi,
};
