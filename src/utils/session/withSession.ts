import * as process from 'process';

import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';
import { IronSessionOptions } from 'iron-session';

import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

const IRON_OPTIONS: IronSessionOptions = {
  cookieName: process.env.SESSION_NAME as string,
  password: process.env.SESSION_PASSWORD as string,
  ttl: 1000 * 60 * 60 * 24,
};

export const withSessionRouter = (handler: NextApiHandler) => {
  return withIronSessionApiRoute(handler, IRON_OPTIONS);
};

export const withSessionSSR = <
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) => {
  return withIronSessionSsr<P>(handler, IRON_OPTIONS);
};
