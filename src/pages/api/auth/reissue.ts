import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError, AxiosResponse } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { instance } from '@/config/axios';
import { Token } from '@/domain/auth/token';

export interface ReissueProps {
  accessToken?: string;
  refreshToken?: string;
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      return instance
        .post<AxiosError, AxiosResponse<Token>, ReissueProps>(
          '/api/auth/reissue',
          {
            accessToken: req.session.token?.accessToken,
            refreshToken: req.session.token?.refreshToken,
          },
        )
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
