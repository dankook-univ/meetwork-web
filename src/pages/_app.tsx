import '../styles/globals.css';

import React, { useEffect } from 'react';
import type { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SWRConfig, SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import { instance } from '@/config/axios';
import { getSession } from '@/utils/session/withSession';

import { reissue } from '@/operations/auth/reissue';
import { Token } from '@/domain/auth/token';

const App = ({ Component, pageProps, token }: AppProps & { token: Token }) => {
  const router = useRouter();

  useEffect(() => {
    if (!instance.defaults.headers.common.Authorization) {
      instance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token?.accessToken}`;
    }
  }, [token]);

  const value: SWRConfiguration = {
    fetcher: instance,
    errorRetryCount: 3,
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

      if (statusCode !== 401 || retryCount > 3) return;

      if (!err.config.headers?.Authorization) {
        instance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token?.accessToken}`;
      } else {
        reissue()
          .then((res) => {
            instance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.accessToken}`;
          })
          .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
              router.replace('/auth');
            }
          });
      }

      setTimeout(() => revalidate({ retryCount }), 1000);
    },
  };

  return (
    <SWRConfig value={value}>
      <Component {...pageProps} />
    </SWRConfig>
  );
};

App.getInitialProps = async (context: AppContext) => {
  const session = await getSession(context);

  return {
    token: session?.token,
  };
};

export default App;
