import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { Quiz } from '@/domain/quiz';

export interface CreateQuizProps {
  eventId: string;
  name: string;
  questions: {
    answer: string;
    choice: string[];
    content: string;
  }[];
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      return fetcher<Quiz, CreateQuizProps>({
        req,
        url: `/api/quiz/new`,
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
