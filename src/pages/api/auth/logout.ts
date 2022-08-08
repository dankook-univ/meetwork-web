import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError, AxiosResponse } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { instance } from '@/config/axios';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
      return instance
        .put<AxiosError, AxiosResponse<true>>(
          '/api/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${req.session.token?.accessToken}`,
            },
          },
        )
        .then(async (response) => {
          req.session.destroy();

          res.status(200).json(response.data);
        })
        .catch((error: AxiosError) => {
          res.status(error.response?.status ?? 400).json(error.response?.data);
        });
    }
  },
);
