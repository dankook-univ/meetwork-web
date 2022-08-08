import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { withoutAuthSSR } from '@/utils/session/withoutAuth';

import KakaoLoginButton from '@/components/auth/KakaoLoginButton';

interface IndexProps {
  kakaoClientId: string;
}

const Index: NextPage<IndexProps> = ({ kakaoClientId }) => {
  return (
    <div className="flex flex-col min-w-screen min-h-screen p-[26px] items-center justify-center bg-gradient-to-b from-mint to-primary">
      <section className="flex flex-1 items-center justify-center">
        <span>로고</span>
      </section>

      <section className="flex flex-1 items-center justify-center">
        <KakaoLoginButton kakaoClientId={kakaoClientId} />
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withoutAuthSSR(
  async () => {
    return {
      props: {
        kakaoClientId: process.env.KAKAO_CLIENT_ID,
      },
    };
  },
);

export default Index;
