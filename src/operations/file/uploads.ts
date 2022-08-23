import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '@/config/axios';

export const uploads = (images: (File | Blob)[]): Promise<string[]> => {
  const form = new FormData();

  images.forEach((image) => {
    form.append('images', image);
  });

  return instance
    .post<AxiosError, AxiosResponse<string[]>>(`/api/file/uploads`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};
