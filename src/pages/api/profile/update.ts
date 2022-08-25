import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { withSessionRouter } from '@/utils/session/withSession';
import { fetcher } from '@/config/axios';
import { getParsedForm } from '@/utils/form/parsedForm';
import { Profile } from '@/domain/user/profile';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '1024mb',
  },
};

export interface ProfileUpdateProps {
  profileId: string;
  nickname: string;
  bio?: string;
  profileImage: File | Blob | null;
  isProfileImageDeleted: boolean;
}

export default withSessionRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') {
      const form = await getParsedForm(req);

      return fetcher<Profile>({
        req,
        url: `/api/profile/update`,
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
