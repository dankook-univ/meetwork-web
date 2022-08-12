import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { Token } from '@/domain/auth/token';

export interface LoginProps {
  token: string;
  type: 'kakao';
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      return fetcher<Token, LoginProps>({
        req,
        url: '/api/auth/login',
        payload: await req.body,
        credential: false,
      })
        .then(async (response) => {
          req.session.token = response.data;
          await req.session.save();

          res.status(200).json(response.data);
        })
        .catch((error: AxiosError) => {
          res.status(error.response?.status ?? 400).json(error.response?.data);
        });
    }
  },
);
