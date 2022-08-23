import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';

export interface UpdateEventProps {
  name?: string;
  code?: string;
  meetingUrl?: string;
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      return fetcher<Event>({
        req,
        url: `/api/event/${(req.query as { id: string }).id}`,
      })
        .then((response) => {
          res.status(200).json(response.data);
        })
        .catch((error: AxiosError) => {
          res.status(error.response?.status ?? 400).json(error.response?.data);
        });
    }

    if (req.method === 'PATCH') {
      return fetcher<Event, UpdateEventProps>({
        req,
        url: `/api/event/${(req.query as { id: string }).id}`,
        payload: await req.body,
      })
        .then((response) => {
          res.status(200).json(response.data);
        })
        .catch((error: AxiosError) => {
          res.status(error.response?.status ?? 400).json(error.response?.data);
        });
    }

    if (req.method === 'DELETE') {
      return fetcher<boolean>({
        req,
        url: `/api/event/${(req.query as { id: string }).id}`,
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
