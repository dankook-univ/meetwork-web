import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { NextApiRequest } from 'next';

export const fetcher = <
  D extends any = any,
  V extends { [key: string]: any } = {},
>({
  req,
  url,
  payload,
  headers,
  credential = true,
}: {
  req: NextApiRequest;
  url: string;
  payload?: V;
  headers?: AxiosRequestHeaders;
  credential?: boolean;
}): Promise<AxiosResponse<D>> => {
  return axios({
    method: req.method,
    url,
    baseURL: process.env.BASE_URL ?? 'http://localhost:8080',
    data: payload ?? {},
    headers: {
      ...(credential
        ? {
            Authorization: `Bearer ${req.session.token?.accessToken}`,
          }
        : {}),
      ...headers,
    },
    maxBodyLength: Infinity,
  });
};

export const instance = axios.create({
  baseURL:
    process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL
      ? 'https://meetwork-web.vercel.app'
      : 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
