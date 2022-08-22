import { instance } from '@/config/axios';
import { AxiosError, AxiosResponse } from 'axios';

import { Board } from '@/domain/board';
import { CreateBoardProps } from '@/pages/api/board/new';

export const create = (props: CreateBoardProps): Promise<Board> => {
  return instance
    .post<AxiosError, AxiosResponse<Board>>('/api/board/new', props)
    .then((res) => {
      return res.data;
    });
};
