import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import _ from 'lodash';
import classNames from 'classnames';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';

interface IndexProps {
  eventId: string;
  quizId: string;
}

const Index: NextPage<IndexProps> = ({ eventId, quizId }) => {
  const router = useRouter();

  const [page, setPage] = useState<number>(0);

  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { data: quiz } = useSWR(['/api/event/participant', quizId], () =>
    MeetworkApi.quiz.participant(quizId),
  );

  const choices = useMemo<string[]>(
    () =>
      _(quiz?.at(page)?.choice ?? [])
        .shuffle()
        .value(),
    [page, quiz],
  );

  useEffect(() => {
    if (me?.isAdmin === true) {
      router.replace(`${router.asPath}/edit`);
    }
  }, [me?.isAdmin, router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo<JSX.Element>(
    () => <HeaderBackButton onClick={handleBack} color="white" />,
    [handleBack],
  );

  const handleCheck = useCallback(
    (answer: string) => {
      return async () => {
        if (!!quiz?.at(page)) {
          await MeetworkApi.quiz.check({
            quizId,
            questionId: quiz.at(page)!.id,
            answer,
          });

          if (quiz?.length === page + 1) {
            await router.replace(`/event/${eventId}/quiz/${quizId}/result`);
          } else {
            setPage((prev) => prev + 1);
          }
        }
      };
    },
    [eventId, page, quiz, quizId, router],
  );

  return (
    <EventLayout
      header={{
        title: '퀴즈',
        subTitle: quiz?.at(0)?.quiz?.name ?? '',
        left: headerLeft,
      }}
    >
      <div className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col items-center justify-center">
          <span className="font-[600] text-[22px] text-black">{`Q. ${
            page + 1
          }`}</span>
          <span className="font-[600] text-[22px] text-black mt-[16px]">
            {quiz?.at(page)?.content ?? ''}
          </span>
        </section>

        <section className="flex flex-1 px-[4px] pb-[4px]">
          <div className="flex flex-1 grid grid-cols-2">
            {choices.map((choice, index) => (
              <div
                key={index}
                className={classNames(
                  'flex flex-col w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-[10px] m-[4px] items-center justify-center',
                  `bg-${['mint', 'primary', 'yellow', 'pink'][index]}`,
                )}
                onClick={handleCheck(choice)}
              >
                <span className="font-[400] text-[18px] text-white">
                  {index + 1}
                </span>
                <span className="font-[400] text-[18px] text-white mt-[12px]">
                  {choice}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const { id, quizId } = (await context.query) as {
      id: string;
      quizId: string;
    };

    return {
      props: {
        eventId: id,
        quizId,
      },
    };
  },
);

export default Index;
