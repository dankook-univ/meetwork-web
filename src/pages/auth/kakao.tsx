import React, { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';

import { KakaoCodeResponse, KakaoTokenResponse } from '@/domain/auth/kakao';
import { login } from '@/operations/auth/login';

interface KakaoProps {
  kakaoClientId: string;
}

const Kakao: NextPage<KakaoProps> = ({ kakaoClientId }) => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const code = useMemo<string>(
    () => (router.query as KakaoCodeResponse)?.code as string,
    [router.query],
  );

  useEffect(() => {
    if (code?.length > 0) {
      axios
        .post<KakaoTokenResponse>(
          `https://kauth.kakao.com/oauth/token?${new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: kakaoClientId,
            redirect_uri: 'http://localhost:3000/auth/kakao',
            code,
          }).toString()}`,
          {},
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        )
        .then((response) => {
          setToken(response.data.access_token);
        });
    }
  }, [kakaoClientId, code]);

  useEffect(() => {
    if (token !== null) {
      login({ token, type: 'kakao' })
        .then(() => {
          router.replace('/');
        })
        .catch((e: AxiosError) => {
          if (e.response?.status === 401) {
            router.replace({
              pathname: '/auth/new',
              query: { token, type: 'kakao' },
            });
          } else {
            console.error(e);
          }
        });
    }
  }, [router, token]);

  return (
    <div className="flex flex-col min-w-screen min-h-screen p-[26px] items-center justify-center bg-gradient-to-b from-mint to-primary"></div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      kakaoClientId: process.env.KAKAO_CLIENT_ID,
    },
  };
};

export default Kakao;
