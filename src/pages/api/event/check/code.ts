import { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRouter } from '@/utils/session/withSession';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') {
    }
  },
);
