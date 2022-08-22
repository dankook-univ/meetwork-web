import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';
import { Board } from '@/domain/board';

import { UpdateBoardProps } from '@/pages/api/board/[id]';

export const update = (
  boardId: string,
  props: UpdateBoardProps,
): Promise<Board> => {
  return instance
    .patch<AxiosError, AxiosResponse<Board>>(`/api/board/${boardId}`, props)
    .then((res) => {
      return res.data;
    });
};
