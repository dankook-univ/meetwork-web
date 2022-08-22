import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { ChatMessage } from '@/domain/chat/chat-message';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, roomId } = (await req.query) as { id: string; roomId: string };

    if (req.method === 'GET') {
      return fetcher<ChatMessage[]>({
        req,
        url: `/api/chat/${id}/${roomId}/messages`,
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
