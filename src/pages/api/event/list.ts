import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';

import { Event } from '@/domain/event/event';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      return fetcher<Event[]>({
        req,
        url: '/api/event/list',
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
