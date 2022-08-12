import '../styles/globals.css';

import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SWRConfig, SWRConfiguration } from 'swr';
import { RecoilRoot } from 'recoil';
import { AxiosError } from 'axios';

import { fetcher } from '@/config/axios';

import { reissue } from '@/operations/auth/reissue';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const value: SWRConfiguration = {
    fetcher,
    errorRetryCount: 2,
    onErrorRetry: async (
      err: AxiosError,
      key,
      config,
      revalidate,
      { retryCount },
    ) => {
      const statusCode = +err
        .toString()
        .split('\n')[0]
        .split('status code ')[1];

      if (retryCount > 2) router?.replace('/auth');

      if (statusCode !== 401 || retryCount > 2) return;
      reissue().catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          router.replace('/auth');
        }
      });

      setTimeout(() => revalidate({ retryCount }), 1000);
    },
  };

  return (
    <RecoilRoot>
      <SWRConfig value={value}>
        <Component {...pageProps} />
      </SWRConfig>
    </RecoilRoot>
  );
};

export default App;
