import React, { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { withAuthSSR } from '@/utils/session/withAuth';

import HomeLayout from '@/components/layout/HomeLayout';
import CreateEventButton from '@/components/home/button/CreateEventButton';
import CreateEventModal from '@/components/home/modal/CreateEventModal';

const Notification: NextPage = () => {
  const router = useRouter();

  const handleOnCreateEvent = useCallback(async () => {
    await router.replace(router.pathname + '?popup=true');
  }, [router]);

  return (
    <HomeLayout
      header={{
        title: '알림',
        right: <CreateEventButton onClick={handleOnCreateEvent} />,
      }}
    >
      <div className="flex flex-1 flex-col">
        <header className="flex px-[22px] pt-[36px]">
          <span className="font-[600] text-[20px] text-black">
            초대받은 공간
          </span>
        </header>

        <div className="flex flex-1"></div>

        <CreateEventModal />
      </div>
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Notification;
