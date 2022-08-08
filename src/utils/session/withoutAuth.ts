import { GetServerSideProps, GetServerSidePropsContext, Redirect } from 'next';
import { withSessionSSR } from '@/utils/session/withSession';

export const withoutAuth = (getServerSideProps: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const token = context.req.session?.token;

    if (token) {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        } as Redirect,
      };
    }

    return await getServerSideProps(context);
  };
};

export const withoutAuthSSR = (handler: GetServerSideProps) =>
  withSessionSSR(withoutAuth(handler));
