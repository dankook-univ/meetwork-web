import { atom } from 'recoil';
import { JoinEventWithCodeProps } from '@/pages/api/event/join/[code]';

export const joinEventState = atom<JoinEventWithCodeProps & { code: string }>({
  key: 'join-event-state',
  default: {
    code: '',
    nickname: '',
  },
});
