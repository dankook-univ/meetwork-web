import { Core } from '@/domain/core';
import { Profile } from '@/domain/user/profile';

export interface Event extends Core {
  name: string;
  code: string;
  meetingUrl?: string;
  organizer: Profile;
}
