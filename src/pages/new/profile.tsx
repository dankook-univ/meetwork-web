import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { withAuthSSR } from '@/utils/session/withAuth';

import BasicLayout from '@/components/layout/BasicLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';

const Profile: NextPage = () => {
  const router = useRouter();

  const handleOnBack = useCallback(async () => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton color="black" onClick={handleOnBack} />,
    [handleOnBack],
  );

  return (
    <BasicLayout
      header={{
        title: '프로필 설정',
        left: headerLeft,
        color: 'white',
        textColor: 'black',
      }}
    >
      <></>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Profile;
