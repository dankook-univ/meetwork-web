import React from 'react';
import { NextPage } from 'next';

import HomeLayout from '@/components/layout/HomeLayout';

interface MeProps {}

const Me: NextPage<MeProps> = ({}) => {
  return (
    <HomeLayout header={{ title: '사용자' }}>
      <div className="flex items-center justify-center">
        <span>me</span>
      </div>
    </HomeLayout>
  );
};

export default Me;
