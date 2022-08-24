import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import CheckIcon from '@/components/icons/CheckIcon';
import CustomInput from '@/components/form/CustomInput';
import PlusIcon from '@/components/icons/PlusIcon';
import QuizAccordion from '@/components/event/QuizAccordion';

interface IndexProps {
  eventId: string;
}

const Index: NextPage<IndexProps> = ({ eventId }) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [quizList, setQuizList] = useState<
    {
      answer: string;
      choice: string[];
      content: string;
    }[]
  >([]);
  const [show, setShow] = useState<number | null>(null);

  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
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

  const handleDone = useCallback(async () => {
    const filtered = quizList
      .filter(
        (quiz) =>
          quiz.answer.trim().length > 0 &&
          quiz.content.trim().length > 0 &&
          quiz.choice.every((it) => it.trim().length > 0),
      )
      .map((quiz) => ({ ...quiz, choice: [...quiz.choice, quiz.answer] }));

    if (title.trim().length > 0 && filtered.length > 0) {
      const { id } = await MeetworkApi.quiz.create({
        eventId,
        name: title,
        questions: filtered,
      });

      await router.replace(`/event/${eventId}/quiz/${id}/edit`);
    }
  }, [eventId, quizList, router, title]);

  const headerRight = useMemo<JSX.Element>(
    () => (
      <div
        className="w-[24px] h-[24px] items-center justify-center"
        onClick={handleDone}
      >
        <CheckIcon color="#363636" />
      </div>
    ),
    [handleDone],
  );

  const handleQuiz = useCallback((index: number) => {
    return (
      props: {
        answer: string;
        choice: string[];
        content: string;
      } | null,
    ) => {
      if (props === null) {
        setQuizList((prev) => prev.filter((it, i) => index !== i));
      } else {
        setQuizList((prev) => prev.map((it, i) => (index === i ? props : it)));
      }
    };
  }, []);

  const appendQuiz = useCallback(() => {
    setQuizList((prev) => [
      ...prev,
      { content: '', answer: '', choice: ['', '', ''] },
    ]);
    setShow(quizList.length);
  }, [quizList.length]);

  return (
    <EventLayout
      header={{
        title: '퀴즈',
        color: 'white',
        textColor: 'black',
        left: headerLeft,
        right: headerRight,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <section className="flex flex-col py-[10px]">
          <header className="flex px-[22px] py-[8px] bg-lightGray">
            <span className="font-[400] text-[14px] text-black">퀴즈 제목</span>
          </header>

          <div className="flex px-[22px]">
            <CustomInput
              value={title}
              setValue={setTitle}
              placeholder="제목을 입력해주세요."
            />
          </div>
        </section>

        <section className="flex flex-col">
          <header className="flex px-[22px] py-[8px] bg-lightGray">
            <span className="font-[400] text-[14px] text-black">질문 목록</span>
          </header>

          {quizList.map((quiz, index) => (
            <QuizAccordion
              index={index}
              key={index}
              quiz={quiz}
              setQuiz={handleQuiz(index)}
              show={show}
              setShow={setShow}
            />
          ))}

          <div
            className="flex px-[22px] py-[12px] border-y-[1px] border-y-mint items-center justify-between bg-white z-[100]"
            onClick={appendQuiz}
          >
            <span className="font-[400] text-[16px] text-mint">
              질문 추가하기
            </span>

            <PlusIcon color="#9BD1DD" />
          </div>
        </section>
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
