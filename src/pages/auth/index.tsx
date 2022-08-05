import React from 'react';
import { NextPage } from 'next';
import KakaoLoginButton from '@/components/auth/KakaoLoginButton';

interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
  return (
    <div className="flex flex-col min-w-screen min-h-screen p-[26px] items-center justify-center bg-gradient-to-b from-mint to-primary">
      <section className="flex flex-1 items-center justify-center">
        <span>로고</span>
      </section>

      <section className="flex flex-1 items-center justify-center">
        <KakaoLoginButton />
      </section>
    </div>
  );
};

export default Index;
