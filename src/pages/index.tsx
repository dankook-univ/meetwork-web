import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { withAuthSSR } from '@/utils/session/withAuth';

import HomeLayout from '@/components/layout/HomeLayout';
import { MeetworkApi } from '@/operations';
import { Event } from '@/domain/event/event';

import CreateEventButton from '@/components/home/button/CreateEventButton';
import CreateEventModal from '@/components/home/modal/CreateEventModal';
import ParticipatingEventItem from '@/components/home/ParticipatingEventItem';

const Index: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR('/api/event/list', MeetworkApi.event.list);

  const events = useMemo<Event[]>(() => data ?? [], [data]);

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
        <header className="sticky top-0 flex w-full px-[22px] pt-[36px] bg-white z-50">
          <span className="font-[600] text-[20px] text-black">
            참가중인 공간
          </span>
        </header>

        <div className="flex flex-1 flex-col">
          {events.map((event) => (
            <ParticipatingEventItem key={event.id} event={event} />
          ))}
        </div>

        <CreateEventModal />
      </div>
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Index;
