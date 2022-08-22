import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Invitation } from '@/domain/invitation';

export const list = (memberId: string): Promise<Invitation[]> => {
  return instance
    .get<AxiosError, AxiosResponse<Invitation[]>>(
      `/api/invitation/list/${memberId}`,
    )
    .then((res) => {
      return res.data;
    });
};
