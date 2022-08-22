import { atom } from 'recoil';

import { Profile } from '@/domain/user/profile';

export interface CreateChannelStateProps {
  name: string;
  select: boolean;
  profiles: Profile[];
}

export const createChannelState = atom<CreateChannelStateProps>({
  key: 'create-channel-state',
  default: {
    name: '',
    select: false,
    profiles: [],
  },
});
