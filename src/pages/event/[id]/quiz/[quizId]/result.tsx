import React, { useCallback, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import useSWR from 'swr';
import _ from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import { QuizResult } from '@/domain/quiz/result';

import EventLayout from '@/components/layout/EventLayout';
import Conditional from '@/hocs/Conditional';
import CustomButton from '@/components/button/CustomButton';

interface ResultProps {
  eventId: string;
  quizId: string;
}

const Result: NextPage<ResultProps> = ({ quizId }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data: result } = useSWR(['/api/quiz/result', quizId], () =>
    MeetworkApi.quiz.result(quizId),
  );
  const { data: me } = useSWR(['/api/quiz/result/me', quizId], () =>
    MeetworkApi.quiz.me(quizId),
  );
  const { data: count } = useSWR(['/api/quiz/count', quizId], () =>
    MeetworkApi.quiz.count(quizId),
  );

  const scoreList = useMemo<{ index: number; result: QuizResult }[]>(
    () =>
      _(result)
        .orderBy((it) => it.count, 'desc')
        .groupBy((it) => it.count)
        .values()
        .map((it, index) => it.map((result) => ({ index: index + 1, result })))
        .flatten()
        .value() ?? [],
    [result],
  );

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <EventLayout
      header={{
        style: 'hidden',
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col pt-[70px] pb-[20px] items-center">
          <span className="font-[600] text-[20px] text-black">퀴즈 결과</span>
          <span className="font-[400] text-[14px] text-black mt-[3px]">
            다들 수고하셨습니다!
          </span>
        </div>

        <AnimatePresence initial={false}>
          {!open && (
            <motion.section
              className="flex flex-1 flex-row items-end justify-center"
              key="top"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
            >
              <div
                className={classNames(
                  'flex flex-col w-[25%] h-[65%] py-[10px] items-center justify-start',
                  `${(result ?? []).length >= 2 ? 'bg-pink' : ''}`,
                )}
              >
                <Conditional condition={(result ?? []).length >= 2}>
                  <>
                    <span className="font-[600] text-[20px] text-white">
                      2nd
                    </span>

                    <Conditional
                      condition={!!scoreList.at(1)?.result.profile.profileImage}
                    >
                      <Image
                        className="rounded-[100%] object-cover"
                        src={
                          scoreList.at(1)?.result.profile.profileImage?.url ??
                          ''
                        }
                        width={60}
                        height={60}
                        alt=""
                      />
                    </Conditional>

                    <Conditional
                      condition={!scoreList.at(1)?.result.profile.profileImage}
                    >
                      <div className="flex w-[60px] h-[60px] rounded-[100%] bg-white" />
                    </Conditional>

                    <span className="font-[600] text-[14px] text-black mt-[6px]">
                      {result?.at(1)?.profile.nickname ?? ''}
                    </span>
                  </>
                </Conditional>
              </div>

              <div
                className={classNames(
                  'flex flex-col w-[25%] h-[90%] py-[10px] items-center justify-start bg-yellow',
                  'shadow-[0_4px_8px_rgba(0,0,0,0.25)]',
                )}
              >
                <span className="font-[600] text-[20px] text-white">1st</span>

                <Conditional
                  condition={!!scoreList.at(0)?.result.profile.profileImage}
                >
                  <Image
                    className="rounded-[100%] object-cover"
                    src={
                      scoreList.at(0)?.result.profile.profileImage?.url ?? ''
                    }
                    width={60}
                    height={60}
                    alt=""
                  />
                </Conditional>

                <Conditional
                  condition={!scoreList.at(0)?.result.profile.profileImage}
                >
                  <div className="flex w-[60px] h-[60px] rounded-[100%] bg-white" />
                </Conditional>

                <span className="font-[600] text-[14px] text-black mt-[6px]">
                  {result?.at(0)?.profile.nickname ?? ''}
                </span>
              </div>

              <div
                className={classNames(
                  'flex flex-col w-[25%] min-h-[40%] py-[10px] items-center justify-start',
                  `${(result ?? []).length >= 3 ? 'bg-primary' : ''}`,
                )}
              >
                <Conditional condition={(result ?? []).length >= 3}>
                  <>
                    <span className="font-[600] text-[20px] text-white">
                      3nd
                    </span>

                    <Conditional
                      condition={!!scoreList.at(2)?.result.profile.profileImage}
                    >
                      <Image
                        className="rounded-[100%] object-cover"
                        src={
                          scoreList.at(2)?.result.profile.profileImage?.url ??
                          ''
                        }
                        width={60}
                        height={60}
                        alt=""
                      />
                    </Conditional>

                    <Conditional
                      condition={!scoreList.at(2)?.result.profile.profileImage}
                    >
                      <div className="flex w-[60px] h-[60px] rounded-[100%] bg-white" />
                    </Conditional>

                    <span className="font-[600] text-[14px] text-black mt-[6px]">
                      {result?.at(2)?.profile.nickname ?? ''}
                    </span>
                  </>
                </Conditional>
              </div>
            </motion.section>
          )}

          <motion.section
            className={classNames(
              'flex flex-col pb-[22px] rounded-tl-[20px] rounded-tr-[20px] shadow-[0_-2px_8px_rgba(0,0,0,0.3)] items-center bg-white',
              `${open ? '' : 'px-[40px]'}`,
              `${open ? 'pt-[20px]' : 'pt-[36px]'}`,
              `${open ? 'h-[100%]' : ''}`,
            )}
            animate={{
              height: open ? '100%' : 'auto',
            }}
            transition={{ type: 'spring' }}
          >
            <div className="flex flex-row w-full px-[18px] items-center justify-between">
              <div className="flex w-[24px] h-[24px]" />
              <span className="font-[600] text-[20px] text-black">
                {scoreList.find((it) => it.result.id === me?.id)?.index}위
              </span>

              <div className="flex w-[24px] h-[24px] items-center justify-center">
                <Conditional condition={open}>
                  <Image
                    src="/icons/x.svg"
                    width={24}
                    height={24}
                    alt=""
                    onClick={handleOpen}
                  />
                </Conditional>
              </div>
            </div>

            <div className="flex w-[70px] h-[70px] rounded-[100%] mt-[10px] mb-[20px] items-center justify-center shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <Conditional condition={!!me?.profile.profileImage}>
                <Image
                  className="rounded-[100%] object-cover"
                  src={me?.profile.profileImage?.url ?? ''}
                  width={70}
                  height={70}
                  alt=""
                />
              </Conditional>

              <Conditional condition={!me?.profile.profileImage}>
                <div className="flex w-[70px] h-[70px] rounded-[100%] bg-gray" />
              </Conditional>
            </div>

            <span className="font-[600] text-[16px] text-black">
              {me?.profile.nickname ?? ''}님은
              <span className="font-[600] text-[16px] text-pink">
                {scoreList.find((it) => it.result.id === me?.id)?.index}위
              </span>
              를 했어요
            </span>

            <Conditional condition={!open}>
              <>
                <span className="font-[400] text-[14px] text-black mt-[2px]">
                  {count ?? 0}문제중,
                  <span className="font-[400] text-[14px] text-pink">{` ${me?.count}문제`}</span>
                  를 맞췄어요.
                </span>

                <CustomButton
                  label="확인"
                  style="w-full py-[16px] rounded-[5px] bg-mint mt-[16px] mb-[10px]"
                  textStyle="font-[400] font-[16px] text-white"
                />

                <span
                  className="font-[400] text-[14px] text-mint"
                  onClick={handleOpen}
                >
                  순위 전체보기
                </span>
              </>
            </Conditional>

            <Conditional condition={open}>
              <div
                className={classNames(
                  'border-t-[1px] border-t-gray mt-[20px]',
                  'overflow-y-auto overflow-x-auto overscroll-x-contain scrollbar-hide',
                )}
              >
                {scoreList.map((score) => (
                  <div
                    key={score.result.id}
                    className="flex w-screen px-[26px] py-[16px] border-b-[1px] border-b-gray"
                  >
                    <span className="font-[400] text-[16px] text-black">{`${score.index}위. ${score.result.profile.nickname}`}</span>
                  </div>
                ))}
              </div>
            </Conditional>
          </motion.section>
        </AnimatePresence>
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

export default Result;
