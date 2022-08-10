import { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRouter } from '@/utils/session/withSession';

export interface CreateEventProps {
  name: string;
  code: string;
  meetingUrl?: string | null;
  organizer: {
    profileImage?: File | null;
    nickname: string;
    bio?: string;
  };
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {},
);
