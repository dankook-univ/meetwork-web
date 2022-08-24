import React, { useCallback, useEffect, useMemo } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import { withAuthSSR } from '@/utils/session/withAuth';
import { QuizResult } from '@/domain/quiz/result';
import _ from 'lodash';

interface ScoreProps {
  eventId: string;
  quizId: string;
}

const Score: NextPage<ScoreProps> = ({ eventId, quizId }) => {
  const router = useRouter();

  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { data: score } = useSWR(['/api/event/result', quizId], () =>
    MeetworkApi.quiz.result(quizId),
  );
  const { data: quiz } = useSWR(['/api/quiz/questions', quizId], () =>
    MeetworkApi.quiz.get(quizId),
  );

  const scoreList = useMemo<{ index: number; result: QuizResult }[]>(
    () =>
      _(score)
        .orderBy((it) => it.count, 'desc')
        .groupBy((it) => it.count)
        .values()
        .map((it, index) => it.map((result) => ({ index: index + 1, result })))
        .flatten()
        .value() ?? [],
    [score],
  );

  useEffect(() => {
    if (me?.isAdmin === false) {
      router.back();
    }
  }, [me?.isAdmin, router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo<JSX.Element>(
    () => <HeaderBackButton onClick={handleBack} color="black" />,
    [handleBack],
  );

  return (
    <EventLayout
      header={{
        title: '순위보기',
        color: 'white',
        textColor: 'black',
        left: headerLeft,
        style: 'h-[136px] pt-[78px] border-b-[1px] border-b-gray',
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        {scoreList.map((score) => (
          <div
            key={score.result.id}
            className="flex px-[26px] py-[16px] border-b-[1px] border-b-gray items-center justify-between"
          >
            <span className="font-[400] text-[16px] text-black">{`${score.index}위. ${score.result.profile.nickname}`}</span>
            <span className="font-[400] text-[16px] text-black">{`${
              score.result.count
            }/${quiz?.questions.length ?? 0}`}</span>
          </div>
        ))}
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

export default Score;
