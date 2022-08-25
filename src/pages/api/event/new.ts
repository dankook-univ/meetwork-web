import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { getParsedForm } from '@/utils/form/parsedForm';
import { Event } from '@/domain/event/event';

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface CreateEventProps {
  name: string;
  code: string;
  meetingCode?: string | null;
  organizerNickname: string;
  organizerBio?: string;
  organizerProfileImage?: File | Blob | null;
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      const form = await getParsedForm(req)

      return fetcher<Event>({
        req,
        url: '/api/event/new',
        payload: form,
        headers: {
          ...form.getHeaders(),
          'Content-Type': 'multipart/form-data',
        },
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
