import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import Conditional from '@/hocs/Conditional';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import PlusIcon from '@/components/icons/PlusIcon';
import Image from 'next/image';

interface IndexProps {
  eventId: string;
}

const Index: NextPage<IndexProps> = ({ eventId }) => {
  const router = useRouter();

  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { data: event } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: quiz } = useSWR(['/api/quiz/list', eventId], () =>
    MeetworkApi.quiz.list(eventId),
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo<JSX.Element>(
    () => <HeaderBackButton onClick={handleBack} color="white" />,
    [handleBack],
  );

  const handleCreate = useCallback(async () => {
    await router.push(`/event/${eventId}/quiz/new`);
  }, [eventId, router]);

  const headerRight = useMemo<JSX.Element>(
    () => (
      <Conditional condition={me?.isAdmin === true}>
        <div
          className="w-[24px] h-[24px] items-center justify-center"
          onClick={handleCreate}
        >
          <PlusIcon color="#FCFCFC" />
        </div>
      </Conditional>
    ),
    [handleCreate, me?.isAdmin],
  );

  const handleInfo = useCallback(
    (quizId: string) => {
      return async () => {
        if (me?.isAdmin === true) {
          await router.push(`/event/${eventId}/quiz/${quizId}/edit`);
        } else if (me?.isAdmin === false) {
          if (quiz?.find((it) => it.id === quizId)?.isFinished === true) {
            await router.push(`/event/${eventId}/quiz/${quizId}/result`);
          } else if (
            quiz?.find((it) => it.id === quizId)?.isFinished === false
          ) {
            await router.push(`/event/${eventId}/quiz/${quizId}`);
          }
        }
      };
    },
    [eventId, me?.isAdmin, quiz, router],
  );

  return (
    <EventLayout
      header={{
        title: '퀴즈',
        subTitle: event?.name ?? '',
        left: headerLeft,
        right: headerRight,
      }}
    >
      <div className="flex flex-1 flex-col">
        {quiz?.map((it) => (
          <div
            key={it.id}
            className="flex px-[26px] py-[16px] border-b-[1px] border-b-gray items-center justify-between"
            onClick={handleInfo(it.id)}
          >
            <span className="font-[400] text-[16px] text-black">{it.name}</span>

            <div className="flex w-[24px] f-[24px] items-center justify-center">
              <Image
                src="/icons/chevron-right.svg"
                width={24}
                height={24}
                alt=""
              />
            </div>
          </div>
        ))}
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
