import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { getParsedForm } from '@/utils/form/parsedForm';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      return fetcher({
        req,
        url: `/api/file/uploads`,
        payload: await getParsedForm(req),
      })
        .then((response) => {
          res.status(200).json(response.data);
        })
        .catch((error: AxiosError) => {
          console.log(error);
          res.status(error.response?.status ?? 400).json(error.response?.data);
        });
    }
  },
);
