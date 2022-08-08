import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError, AxiosResponse } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { instance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

export interface LoginProps {
  token: string;
  type: 'kakao';
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      const { token, type }: LoginProps = await req.body;

      return instance
        .post<AxiosError, AxiosResponse<Token>>('/api/auth/login', {
          token,
          type,
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
