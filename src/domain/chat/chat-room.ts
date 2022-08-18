import { Core } from '@/domain/core';
import { Profile } from '@/domain/user/profile';
import { Event } from '@/domain/event/event';

export interface ChatRoom extends Core {
  name: string;
  isPrivate: string;
  organizer: Profile;
  event: Event;
  participants: Profile[];
}
