import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { withAuthSSR } from '@/utils/session/withAuth';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import { MeetworkApi } from '@/operations';
import Conditional from '@/hocs/Conditional';

interface IndexProps {
  eventId: string;
}

const Index: NextPage<IndexProps> = ({ eventId }) => {
  const router = useRouter();

  const { data: event } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleChangeName = useCallback(async () => {
    if (me?.isAdmin) {
      await router.push(`${router.asPath}/name`);
    }
  }, [me?.isAdmin, router]);

  const handleChannel = useCallback(async () => {
    await router.push(`${router.asPath}/channel`);
  }, [router]);

  const handleRole = useCallback(async () => {
    if (me?.id === event?.organizer.id) {
      await router.push(`${router.asPath}/role`);
    }
  }, [event?.organizer.id, me?.id, router]);

  const handleChangeMeetingUrl = useCallback(async () => {
    if (me?.isAdmin) {
      await router.push(`${router.asPath}/meeting`);
    }
  }, [me?.isAdmin, router]);

  const handleDelete = useCallback(async () => {
    if (me?.id === event?.organizer.id) {
      await MeetworkApi.event.delete(eventId);

      await router.replace('/');
    }
  }, [event?.organizer.id, eventId, me?.id, router]);

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
        <Conditional condition={event?.organizer.id === me?.id}>
          <div
            className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray"
            onClick={handleChangeName}
          >
            <span className="font-[400] text-[16px] text-black">
              공간명 변경
            </span>
          </div>
        </Conditional>

        <div
          className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray"
          onClick={handleChannel}
        >
          <span className="font-[400] text-[16px] text-black">채널</span>
        </div>

        <Conditional condition={event?.organizer.id === me?.id}>
          <div
            className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray"
            onClick={handleRole}
          >
            <span className="font-[400] text-[16px] text-black">역할</span>
          </div>
        </Conditional>

        <Conditional condition={me?.isAdmin === true}>
          <>
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
          </>
        </Conditional>

        <Conditional condition={event?.organizer.id === me?.id}>
          <div
            className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray"
            onClick={handleDelete}
          >
            <span className="font-[400] text-[16px] text-pink">공간 삭제</span>
          </div>
        </Conditional>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const { id } = (await context.query) as { id: string };

    return {
      props: {
        eventId: id,
      },
    };
  },
);

export default Index;
