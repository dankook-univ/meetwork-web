import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Board } from '@/domain/board';

export const deleteBoard = (boardId: string): Promise<Board> => {
  return instance
    .delete<AxiosError, AxiosResponse<Board>>(`/api/board/${boardId}`)
    .then((res) => {
      return res.data;
    });
};
