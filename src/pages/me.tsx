import React from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';

import { withAuthSSR } from '@/utils/session/withAuth';
import { me } from '@/operations/user/me';

import HomeLayout from '@/components/layout/HomeLayout';

interface MeProps {}

const Me: NextPage<MeProps> = ({}) => {
  const { data, error } = useSWR('api/user/me', me, {
    errorRetryCount: 1,
  });

  return (
    <HomeLayout header={{ title: '사용자' }}>
      <div className="flex items-center justify-center">
        <span>me</span>
      </div>
    </HomeLayout>
  );
};

export const getServerSideProps = withAuthSSR(async () => {
  return {
    props: {},
  };
});

export default Me;
