import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Comment } from '@/domain/post/comment';

import { CreateCommentProps } from '@/pages/api/comment/new';

export const create = (props: CreateCommentProps): Promise<Comment> => {
  return instance
    .post<AxiosError, AxiosResponse<Comment>, CreateCommentProps>(
      '/api/comment/new',
      props,
    )
    .then((res) => {
      return res.data;
    });
};
