import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Post } from '@/domain/post';

export const list = (boardId: string, page: number = 1): Promise<Post[]> => {
  return instance
    .get<AxiosError, AxiosResponse<Post[]>>(
      `/api/post/list/${boardId}?page=${page}`,
    )
    .then((res) => {
      return res.data;
    });
};
