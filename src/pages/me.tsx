import React, { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';

import { withAuthSSR } from '@/utils/session/withAuth';
import { MeetworkApi } from '@/operations';

import HomeLayout from '@/components/layout/HomeLayout';

const Me: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR('/api/user/me.ts', MeetworkApi.user.me);

  const handleOnLogout = useCallback(async () => {
    MeetworkApi.auth.logout().finally(() => {
      router.replace('/auth');
    });
  }, [router]);

  return (
    <HomeLayout header={{ title: '사용자' }}>
      <div className="flex flex-1 flex-col pt-[54px] pb-[20px]">
        <div className="flex flex-1 flex-col px-[18px]">
          <div className="flex flex-col max-w-[calc(100vw-36px)] px-[16px] pt-[97px] pb-[13px] rounded-[10px] shadow-[0_0_4px_2px_rgba(0,0,0,0.1)]">
            <span className="max-w-[calc(100vw-68px)] overflow-clip font-[400] text-[28px] text-black">
              {data?.name}
            </span>

            <span className="max-w-[calc(100vw-68px)] overflow-clip font-[400] text-[16px] text-mint">
              {data?.email}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col px-[20px] py-[6px]">
            <span className="font-[400] text-[16px] text-lightGray">
              회원아이디
            </span>
            <span className="font-[400] text-[16px] text-lightGray">
              @{data?.id}
            </span>
          </div>

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

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Me;
