import { instance } from '@/config/axios';
import { AxiosError, AxiosResponse } from 'axios';

export const deleteComment = (commentId: string): Promise<boolean> => {
  return instance
    .delete<AxiosError, AxiosResponse<boolean>>(`/api/comment/${commentId}`)
    .then((res) => {
      return res.data;
    });
};