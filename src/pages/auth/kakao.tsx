import React, { useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import axios from 'axios';

import { withoutAuthSSR } from '@/utils/session/withoutAuth';

import { KakaoTokenResponse } from '@/domain/auth/kakao';
import { login } from '@/operations/auth/login';
import { useRouter } from 'next/router';
import { instance } from '@/config/axios';

interface KakaoProps {
  token: string;
}

const Kakao: NextPage<KakaoProps> = ({ token }) => {
  const router = useRouter();

  useEffect(() => {
    if (token) {
      login({ token, type: 'kakao' })
        .then((res) => {
          instance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${res.data.accessToken}`;

          router.replace('/');
        })
        .catch(() => {
          router.replace(`/auth/new?token=${token}&type=kakao`);
        });
    }
  }, [router, token]);

  return (
    <div className="flex flex-col min-w-screen min-h-screen p-[26px] items-center justify-center bg-gradient-to-b from-mint to-primary"></div>
  );
};

export const getServerSideProps: GetServerSideProps = withoutAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const token = await axios
      .post<KakaoTokenResponse>(
        `https://kauth.kakao.com/oauth/token?${new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID as string,
          redirect_uri: 'http://localhost:3000/auth/kakao',
          code: (context.query as { code: string }).code as string,
        }).toString()}`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then((response) => {
        return response.data.access_token;
      });

    return {
      props: { token },
    };
  },
);

export default Kakao;
