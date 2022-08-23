import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';

export const deletePost = (postId: string): Promise<boolean> => {
  return instance
    .delete<AxiosError, AxiosResponse<boolean>>(`/api/post/${postId}`)
    .then((res) => {
      return res.data;
    });
};
