import { Core } from '@/domain/core';

export interface User extends Core {
  name: string;
  email: string;
}
