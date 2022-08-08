import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { Token } from '@/domain/auth/token';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      return fetcher<Token, Token>({
        req,
        url: '/api/auth/reissue',
        payload: req.session.token,
        credential: false,
      })
        .then(async (response) => {
          req.session.token = response.data;
          await req.session.save();

          res.status(200).json(response.data);
        })
        .catch((error: AxiosError) => {
          req.session.destroy();
          res.status(error.response?.status ?? 400).json(error.response?.data);
        });
    }
  },
);
