import { Core } from '@/domain/core';

export interface Quiz extends Core {
  name: string;
  isFinished: boolean;
}
