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
import QuizAccordion from '@/components/event/QuizAccordion';

interface EditProps {
  eventId: string;
  quizId: string;
}

const Edit: NextPage<EditProps> = ({ eventId, quizId }) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [quizList, setQuizList] = useState<
    {
      questionId: string;
      answer: string;
      choice: string[];
      content: string;
    }[]
  >([]);
  const [show, setShow] = useState<number | null>(null);

  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { data: quiz, mutate } = useSWR(['/api/quiz/questions', quizId], () =>
    MeetworkApi.quiz.get(quizId),
  );
  const { mutate: mutateQuizList } = useSWR(['/api/quiz/list', eventId], () =>
    MeetworkApi.quiz.list(eventId),
  );

  useEffect(() => {
    if (me?.isAdmin === false) {
      router.back();
    }
  }, [me?.isAdmin, router]);

  useEffect(() => {
    if (quiz !== undefined) {
      setTitle(quiz.quiz.name);
      setQuizList(
        quiz.questions.map((it) => ({
          questionId: it.id,
          answer: it.answer,
          choice: it.choice.filter((choice) => choice !== it.answer),
          content: it.content,
        })),
      );
    }
  }, [quiz]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo<JSX.Element>(
    () => <HeaderBackButton onClick={handleBack} color="black" />,
    [handleBack],
  );

  const handleDone = useCallback(async () => {
    if (quiz !== undefined) {
      await MeetworkApi.quiz.update(quizId, {
        name: title,
        questions: quizList.map((quiz) => ({
          ...quiz,
          choice: [...quiz.choice, quiz.answer],
        })),
      });

      await mutate();
      await mutateQuizList();

      router.back();
    }
  }, [mutate, mutateQuizList, quiz, quizId, quizList, router, title]);

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
      props:
        | {
            answer: string;
            choice: string[];
            content: string;
          }
        | {
            questionId: string;
            answer: string;
            choice: string[];
            content: string;
          }
        | null,
    ) => {
      if (props === null) {
        setQuizList((prev) => prev.filter((it, i) => index !== i));
      } else {
        setQuizList((prev) =>
          prev.map((it, i) =>
            index === i
              ? (props as {
                  questionId: string;
                  answer: string;
                  choice: string[];
                  content: string;
                })
              : it,
          ),
        );
      }
    };
  }, []);

  const handleScore = useCallback(async () => {
    await router.push(`/event/${eventId}/quiz/${quizId}/score`);
  }, [eventId, quizId, router]);

  const handleDelete = useCallback(async () => {
    await MeetworkApi.quiz.delete(quizId);
    await mutateQuizList();

    await router.replace(`/event/${eventId}/quiz`);
  }, [eventId, mutateQuizList, quizId, router]);

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
            <span className="font-[400] text-[14px] text-black">순위</span>
          </header>

          <div
            className="flex px-[22px] py-[12px] border-b-[1px] border-b-gray mb-[10px]"
            onClick={handleScore}
          >
            <span className="font-[400] text-[16px] text-black">
              순위 전체보기
            </span>
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
        </section>

        <div className="flex flex-1" />

        <section className="flex w-full">
          <div
            className="flex w-full px-[22px] py-[12px] border-y-[1px] border-y-pink items-center justify-between bg-white z-[100]"
            onClick={handleDelete}
          >
            <span className="font-[400] text-[16px] text-pink">
              퀴즈 삭제하기
            </span>
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

export default Edit;
