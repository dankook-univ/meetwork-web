import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { Quiz } from '@/domain/quiz';

export interface UpdateQuizProps {
  name: string;
  questions: {
    questionId: string;
    answer: string;
    choice: string[];
    content: string;
  }[];
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = (await req.query) as { id: string };

    if (req.method === 'PATCH') {
      return fetcher<Quiz, UpdateQuizProps>({
        req,
        url: `/api/quiz/${id}`,
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
        url: `/api/quiz/${id}`,
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
