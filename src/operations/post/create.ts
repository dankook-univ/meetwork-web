import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Post } from '@/domain/post';

import { CreatePostProps } from '@/pages/api/post/new';

export const create = (props: CreatePostProps): Promise<Post> => {
  return instance
    .post<AxiosError, AxiosResponse<Post>>(`/api/post/new`, props)
    .then((res) => {
      return res.data;
    });
};
