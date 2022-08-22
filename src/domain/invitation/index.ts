import { Core } from '@/domain/core';
import { Event } from '@/domain/event/event';

export interface Invitation extends Core {
  event: Event;
  isAdmin: boolean;
}
