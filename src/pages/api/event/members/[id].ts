import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, page, adminOnly } = (await req.query) as {
      id: string;
      page: string;
      adminOnly?: string;
    };

    if (req.method === 'GET') {
      return fetcher({
        req,
        url: `/api/event/members/${id}?page=${page}${
          adminOnly !== undefined ? '&adminOnly=' + adminOnly : ''
        }`,
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
