import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import FormData from 'form-data';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { Event } from '@/domain/event/event';
import { getParsedForm } from '@/utils/form/parsedForm';

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface JoinEventWithCodeProps {
  nickname: string;
  bio?: string;
  profileImage?: File | Blob | null;
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { code } = (await req.query) as { code: string };

    if (req.method === 'PATCH') {
      return fetcher<Event, FormData>({
        req,
        url: `/api/event/join/${code}`,
        payload: await getParsedForm(req),
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
