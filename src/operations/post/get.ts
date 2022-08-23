import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Post } from '@/domain/post';

export const get = (postId: string): Promise<Post> => {
  return instance
    .get<AxiosError, AxiosResponse<Post>>(`/api/post/${postId}`)
    .then((res) => {
      return res.data;
    });
};
