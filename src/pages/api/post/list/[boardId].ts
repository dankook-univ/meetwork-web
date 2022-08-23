import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { Post } from '@/domain/post';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { boardId, page } = (await req.query) as {
      boardId: string;
      page?: string;
    };

    if (req.method === 'GET') {
      return fetcher<Post>({
        req,
        url: `/api/post/list/${boardId}?page=${page ?? 1}`,
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
