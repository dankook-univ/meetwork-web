import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import FormData from 'form-data';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { getParsedForm } from '@/utils/form/parsedForm';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '1024mb',
  },
};

export interface JoinEventProps {
  nickname: string;
  bio?: string;
  profileImage?: File | Blob | null;
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = (await req.query) as { id: string };

    if (req.method === 'PATCH') {
      const form = await getParsedForm(req);

      return fetcher<boolean, FormData>({
        req,
        url: `/api/invitation/join/${id}`,
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
