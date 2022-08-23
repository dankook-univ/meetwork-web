import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { Post } from '@/domain/post';

export interface UpdatePostProps {
  title: string;
  content: string;
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { postId } = (await req.query) as { postId: string };

    if (req.method === 'GET') {
      return fetcher<Post>({
        req,
        url: `/api/post/${postId}`,
      })
        .then((response) => {
          res.status(200).json(response.data);
        })
        .catch((error: AxiosError) => {
          res.status(error.response?.status ?? 400).json(error.response?.data);
        });
    }

    if (req.method === 'PATCH') {
      return fetcher<Post, UpdatePostProps>({
        req,
        url: `/api/post/${postId}`,
        payload: await req.body,
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
        url: `/api/post/${postId}`,
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
