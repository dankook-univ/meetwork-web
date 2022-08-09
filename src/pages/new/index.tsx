import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { withAuthSSR } from '@/utils/session/withAuth';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/new/profile', '/new');
  }, [router]);

  return <></>;
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Index;
