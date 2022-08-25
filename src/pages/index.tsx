import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import _ from 'lodash';

import { withAuthSSR } from '@/utils/session/withAuth';

import HomeLayout from '@/components/layout/HomeLayout';
import { MeetworkApi } from '@/operations';
import { Event } from '@/domain/event/event';

import CreateEventButton from '@/components/home/button/CreateEventButton';
import CreateEventModal from '@/components/home/modal/CreateEventModal';
import ParticipatingEventItem from '@/components/home/ParticipatingEventItem';
import Conditional from '@/hocs/Conditional';

const Index: NextPage = () => {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [eventList, setEventList] = useState<Event[]>([]);

  const { data: events } = useSWR(['/api/event/list', page], () =>
    MeetworkApi.event.list(page),
  );

  const hasMore = useMemo<boolean>(
    () => !(events !== undefined && events.length < 15),
    [events],
  );

  useEffect(() => {
    setPage(1);
    setEventList([]);
  }, []);

  useEffect(() => {
    if (events) {
      setEventList((prev) =>
        _([...prev, ...events])
          .uniqBy((it) => it.id)
          .value(),
      );
    }
  }, [events]);

  const handleOnCreateEvent = useCallback(async () => {
    await router.replace(router.pathname + '?popup=true');
  }, [router]);

  const handleNext = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

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
          {eventList.map((event) => (
            <ParticipatingEventItem key={event.id} event={event} />
          ))}

          <Conditional condition={eventList.length > 0 && hasMore}>
            <div
              className="flex w-[calc(100%-40px)] py-[14px] mx-[20px] my-[6px] rounded-[10px] items-center justify-center bg-gray"
              onClick={handleNext}
            >
              <span className="font-[400] text-[14px] text-black">더보기</span>
            </div>
          </Conditional>
        </div>

        <CreateEventModal />
      </div>
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Index;
