import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { UpdateAdminProps } from '@/pages/api/event/updateAdmin';

export const updateAdmin = (props: UpdateAdminProps): Promise<boolean> => {
  return instance
    .patch<AxiosError, AxiosResponse<boolean>>('/api/event/updateAdmin', props)
    .then((res) => {
      return res.data;
    });
};
