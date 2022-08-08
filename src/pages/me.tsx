import React, { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';

import { withAuthSSR } from '@/utils/session/withAuth';
import { me } from '@/operations/user/me';
import { logout } from '@/operations/auth/logout';

import HomeLayout from '@/components/layout/HomeLayout';

interface MeProps {}

const Me: NextPage<MeProps> = () => {
  const router = useRouter();

  const { data } = useSWR('/api/user/me', me);

  const handleOnLogout = useCallback(async () => {
    logout().then(() => {
      router.replace('/auth');
    });
  }, [router]);

  return (
    <HomeLayout header={{ title: '사용자' }}>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center">
          <span>{data?.name}</span>
          <span>@{data?.id}</span>
          <span>{data?.email}</span>
        </div>

        <div className="flex flex-col pb-[20px]">
          <div
            className="flex flex-row px-[18px] py-[20px] border-y-[1px] border-lightGray items-center justify-between"
            onClick={handleOnLogout}
          >
            <span className="font-[400] text-[20px] text-black">로그아웃</span>

            <Image src="/icons/log-out.svg" width={24} height={24} alt="" />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(async () => {
  return {
    props: {},
  };
});

export default Me;
