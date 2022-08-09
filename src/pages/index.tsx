import React, { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { withAuthSSR } from '@/utils/session/withAuth';

import HomeLayout from '@/components/layout/HomeLayout';
import { MeetworkApi } from '@/operations';
import CreateEventButton from '@/components/home/button/CreateEventButton';
import CreateEventModal from '@/components/home/modal/CreateEventModal';

const Index: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR('/api/event/list', MeetworkApi.event.list);

  const handleOnCreateEvent = useCallback(async () => {
    await router.replace(router.pathname + '?popup=true');
  }, [router]);

  return (
    <HomeLayout
      header={{
        title: 'HOME',
        right: <CreateEventButton onClick={handleOnCreateEvent} />,
      }}
    >
      <div className="flex flex-1 flex-col">
        <header className="flex px-[22px] py-[36px]">
          <span className="font-[600] text-[20px] text-black">
            참가중인 공간
          </span>
        </header>

        <div className="flex flex-1"></div>

        <CreateEventModal />
      </div>
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Index;
