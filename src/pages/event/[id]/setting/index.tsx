import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { withAuthSSR } from '@/utils/session/withAuth';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';

interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleChangeName = useCallback(async () => {
    await router.push(`${router.asPath}/name`);
  }, [router]);

  const handleChangeMeetingUrl = useCallback(async () => {
    await router.push(`${router.asPath}/meeting`);
  }, [router]);

  return (
    <EventLayout
      header={{
        title: '설정',
        textColor: 'black',
        color: 'white',
        left: headerLeft,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col border-t-[3px] border-t-gray">
        <div
          className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray"
          onClick={handleChangeName}
        >
          <span className="font-[400] text-[16px] text-black">공간명 변경</span>
        </div>

        <div className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray">
          <span className="font-[400] text-[16px] text-black">채널</span>
        </div>

        <div className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray">
          <span className="font-[400] text-[16px] text-black">역할</span>
        </div>

        <div className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray">
          <span className="font-[400] text-[16px] text-black">퀴즈</span>
        </div>

        <div
          className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray"
          onClick={handleChangeMeetingUrl}
        >
          <span className="font-[400] text-[16px] text-black">
            Meeting Room 설정
          </span>
        </div>

        <div className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray">
          <span className="font-[400] text-[16px] text-pink">공간 삭제</span>
        </div>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Index;
