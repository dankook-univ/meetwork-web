import React from 'react';
import { NextPage } from 'next';

import HomeLayout from '@/components/layout/HomeLayout';

interface IndexProps {}

const Index: NextPage<IndexProps> = ({}) => {
  return (
    <HomeLayout header={{ title: 'HOME' }}>
      <div className="flex items-center justify-center">
        <span>Home</span>
      </div>
    </HomeLayout>
  );
};

export default Index;
