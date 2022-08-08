import React from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';

import { withAuthSSR } from '@/utils/session/withAuth';
import { instance } from '@/config/axios';
import { me } from '@/operations/user/me';

import HomeLayout from '@/components/layout/HomeLayout';

interface MeProps {}

const Me: NextPage<MeProps> = () => {
  useSWR('/api/user/me', me);

  return (
    <HomeLayout header={{ title: '사용자' }}>
      <div className="flex items-center justify-center">
        <span>me</span>
      </div>
    </HomeLayout>
  );
};

export const getServerSideProps = withAuthSSR(async (context) => {
  instance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${context.req.session.token?.accessToken}`;

  return {
    props: {},
  };
});

export default Me;
