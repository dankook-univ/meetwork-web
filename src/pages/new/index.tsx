import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { withAuthSSR } from '@/utils/session/withAuth';

const Index: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(async () => {
  return {
    redirect: {
      destination: '/new/profile',
      permanent: true,
    },
  };
});

export default Index;
