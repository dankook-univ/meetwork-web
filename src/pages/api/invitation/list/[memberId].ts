import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { Invitation } from '@/domain/invitation';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { memberId } = (await req.query) as { memberId: string };

    if (req.method === 'GET') {
      return fetcher<Invitation[]>({
        req,
        url: `/api/invitation/list/${memberId}`,
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
