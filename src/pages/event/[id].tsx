import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { withAuthSSR } from '@/utils/session/withAuth';
import { MeetworkApi } from '@/operations';
import EventLayout from '@/components/layout/EventLayout';

interface EventProps {
  eventId: string;
}

const Event: NextPage<EventProps> = ({ eventId }) => {
  const router = useRouter();

  const { data } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );

  const handleOnclick = useCallback(async () => {
    await router.push('/event/new');
  }, [router]);

  const headerRight = useMemo(
    () => (
      <div
        className="w-[24px] h-[24px] items-center justify-center"
        onClick={handleOnclick}
      >
        <Image src="/icons/plus.svg" width={24} height={24} alt="" />
      </div>
    ),
    [handleOnclick],
  );

  return (
    <EventLayout
      header={{
        title: data?.name ?? '',
        titleAlign: 'left',
        right: headerRight,
      }}
    >
      <></>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {
        eventId: (context.params as { id: string }).id,
      } as EventProps,
    };
  },
);

export default Event;
