import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';

export interface UpdateAdminProps {
  eventId: string;
  profileId: string;
  isAdmin: boolean;
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') {
      return fetcher<boolean, UpdateAdminProps>({
        req,
        url: `/api/event/updateAdmin`,
        payload: await req.body,
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
