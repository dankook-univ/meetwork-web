import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';

import { withoutAuthSSR } from '@/utils/session/withoutAuth';

import KakaoLoginButton from '@/components/auth/KakaoLoginButton';

interface IndexProps {
  kakaoClientId: string;
}

const Index: NextPage<IndexProps> = ({ kakaoClientId }) => {
  return (
    <div className="flex flex-col min-w-screen min-h-screen p-[26px] items-center justify-center bg-gradient-to-b from-mint to-primary">
      <div className="flex flex-col items-center">
        <Image
          className="rounded-[20px]"
          src="/icons/logo.svg"
          width={130}
          height={130}
          alt=""
        />

        <div className="mt-[160px]">
          <KakaoLoginButton kakaoClientId={kakaoClientId} />
        </div>
      </div>
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
