import { Core } from '@/domain/core';
import { Event } from '@/domain/event/event';

export interface Board extends Core {
  id: string;
  name: string;
  adminOnly: boolean;
  event: Event;
}
