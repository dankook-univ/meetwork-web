import { atom } from 'recoil';
import { CreateEventProps } from '@/pages/api/event/new';

export const createEventState = atom<CreateEventProps>({
  key: 'create-event-state',
  default: {
    name: '',
    code: '',
    meetingUrl: null,
    organizer: {
      profileImage: null,
      nickname: '',
      bio: '',
    },
  },
});
