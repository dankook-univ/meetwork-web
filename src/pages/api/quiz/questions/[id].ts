import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { Quiz } from '@/domain/quiz';
import { Question } from '@/domain/quiz/question';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = (await req.query) as { id: string };

    if (req.method === 'GET') {
      return fetcher<{ quiz: Quiz; questions: Question[] }>({
        req,
        url: `/api/quiz/questions/${id}`,
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
