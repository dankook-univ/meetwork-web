import { GetServerSideProps, GetServerSidePropsContext, Redirect } from 'next';

import { withSessionSSR } from '@/utils/session/withSession';

export const withAuth = (getServerSideProps: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const token = context.req.session.token;

    if (!token) {
      return {
        redirect: {
          destination: '/auth',
          permanent: true,
        } as Redirect,
      };
    }

    return await getServerSideProps(context);
  };
};

export const withAuthSSR = (handler: GetServerSideProps) =>
  withSessionSSR(withAuth(handler));
