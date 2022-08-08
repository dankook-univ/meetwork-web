import React from 'react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  Redirect,
} from 'next';
import axios from 'axios';

import { withoutAuthSSR } from '@/utils/session/withoutAuth';
import { MeetworkApi } from '@/operations';
import { KakaoTokenResponse } from '@/domain/auth/kakao';

const Kakao: NextPage = () => {
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

    return MeetworkApi.auth
      .login({ token, type: 'kakao' })
      .then(async (res) => {
        context.req.session.token = res.data;
        await context.req.session.save();

        return {
          redirect: {
            destination: '/',
            permanent: true,
          } as Redirect,
        };
      })
      .catch(() => {
        return {
          redirect: {
            destination: `/auth/new?token=${token}&type=kakao`,
            permanent: false,
          } as Redirect,
        };
      });
  },
);

export default Kakao;
