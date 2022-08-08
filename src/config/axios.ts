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
    baseURL: 'http://localhost:8080',
    data: payload ?? {},
    headers: {
      'Content-Type': 'application/json',
      ...(credential
        ? {
            Authorization: `Bearer ${req.session.token?.accessToken}`,
          }
        : {}),
      ...headers,
    },
  });
};

export const instance = axios.create({
  baseURL: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
