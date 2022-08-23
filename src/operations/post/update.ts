import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Post } from '@/domain/post';

import { UpdatePostProps } from '@/pages/api/post/[postId]';

export const update = (
  postId: string,
  props: UpdatePostProps,
): Promise<Post> => {
  return instance
    .patch<AxiosError, AxiosResponse<Post>>(`/api/post/${postId}`, props)
    .then((res) => {
      return res.data;
    });
};
