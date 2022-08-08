import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError, AxiosResponse } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { instance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

export interface SignUpProps {
  type: 'kakao';
  token: string;
  name: string;
  email: string;
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      const props: SignUpProps = await req.body;

      return instance
        .post<AxiosError, AxiosResponse<Token>, SignUpProps>(
          '/api/auth/new',
          props,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
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
