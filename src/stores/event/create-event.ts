import { atom } from 'recoil';
import { CreateEventProps } from '@/pages/api/event/new';

export const createEventState = atom<CreateEventProps>({
  key: 'createRoom.ts-event-state',
  default: {
    name: '',
    code: '',
    organizerNickname: '',
  },
});
