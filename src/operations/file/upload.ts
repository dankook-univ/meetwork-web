import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';

export const upload = (image: File | Blob): Promise<string> => {
  const form = new FormData();

  form.append('image', image);

  return instance
    .post<AxiosError, AxiosResponse<string>>(`/api/file/upload`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};
