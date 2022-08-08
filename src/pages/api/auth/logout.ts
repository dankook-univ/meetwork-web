import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
      return fetcher<boolean>({
        req,
        url: '/api/auth/logout',
      })
        .then(async (response) => {
          req.session.destroy();

          res.status(200).json(response.data);
        })
        .catch((error: AxiosError) => {
          req.session.destroy();

          res.status(error.response?.status ?? 400).json(error.response?.data);
        });
    }
  },
);
