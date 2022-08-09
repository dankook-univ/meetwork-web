import AuthApi from '@/operations/auth';
import UserApi from '@/operations/user';
import EventApi from '@/operations/event';

export const MeetworkApi = {
  auth: AuthApi,
  user: UserApi,
  event: EventApi,
};
