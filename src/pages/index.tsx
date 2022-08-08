import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { withAuthSSR } from '@/utils/session/withAuth';

import HomeLayout from '@/components/layout/HomeLayout';

const Index: NextPage = () => {
  return (
    <HomeLayout header={{ title: 'HOME' }}>
      <div className="flex flex-1 flex-col">
        <header className="flex px-[22px] py-[36px]">
          <span className="font-[600] text-[20px] text-black">
            참가중인 공간
          </span>
        </header>

        <div className="flex flex-1"></div>
      </div>
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Index;
