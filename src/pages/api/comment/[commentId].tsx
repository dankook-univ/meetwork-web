import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { Comment } from '@/domain/post/comment';

export interface UpdateCommentProps {
  commentId: string;
  postId: string;
  content: string;
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { commentId } = (await req.query) as { commentId: string };

    if (req.method === 'PATCH') {
      return fetcher<Comment, UpdateCommentProps>({
        req,
        url: `/api/comment/${commentId}`,
      })
        .then((response) => {
          res.status(200).json(response.data);
        })
        .catch((error: AxiosError) => {
          res.status(error.response?.status ?? 400).json(error.response?.data);
        });
    }

    if (req.method === 'DELETE') {
      return fetcher<boolean>({
        req,
        url: `/api/comment/${commentId}`,
      })
        .then((response) => {
          res.status(200).json(response.data);
        })
        .catch((error: AxiosError) => {
          res.status(error.response?.status ?? 400).json(error.response?.data);
        });
    }
  },
);
