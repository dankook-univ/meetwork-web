import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { ChatRoom } from '@/domain/chat/chat-room';

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, roomId } = (await req.query) as { id: string; roomId: string };

    if (req.method === 'GET') {
      return fetcher<ChatRoom>({
        req,
        url: `/api/chat/${id}/${roomId}`,
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
