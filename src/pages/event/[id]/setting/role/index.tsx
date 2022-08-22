import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import _ from 'lodash';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import { Profile } from '@/domain/user/profile';
import Conditional from '@/hocs/Conditional';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import EventLayout from '@/components/layout/EventLayout';
import PlusIcon from '@/components/icons/PlusIcon';

interface IndexProps {
  eventId: string;
}

const Index: NextPage<IndexProps> = ({ eventId }) => {
  const router = useRouter();

  const [adminList, setAdminList] = useState<Profile[]>([]);
  const [generalList, setGeneralList] = useState<Profile[]>([]);
  const [adminPage, setAdminPage] = useState<number>(1);
  const [generalPage, setGeneralPage] = useState<number>(1);

  const { data: event } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: admin } = useSWR(
    ['/api/event/members', eventId, adminPage, 'admin'],
    () => MeetworkApi.event.members(eventId, adminPage, true),
    {
      revalidateOnMount: true,
    },
  );
  const { data: general } = useSWR(
    ['/api/event/members', eventId, generalPage, 'general'],
    () => MeetworkApi.event.members(eventId, generalPage, false),
    {
      revalidateOnMount: true,
    },
  );

  useEffect(() => {
    if (admin) {
      setAdminList((prev) =>
        _([...prev, ...admin])
          .unionBy((it) => it.id)
          .value(),
      );
    }
  }, [admin]);

  useEffect(() => {
    if (general) {
      setGeneralList((prev) =>
        _([...prev, ...general])
          .unionBy((it) => it.id)
          .value(),
      );
    }
  }, [general]);

  const hasMoreAdmin = useMemo<boolean>(
    () => !(admin !== undefined && admin.length < 10),
    [admin],
  );

  const hasMoreGeneral = useMemo<boolean>(
    () => !(general !== undefined && general.length < 10),
    [general],
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleNextAdmin = useCallback(() => {
    setAdminPage((prev) => prev + 1);
  }, [setAdminPage]);

  const handleNextGeneral = useCallback(() => {
    setGeneralPage((prev) => prev + 1);
  }, [setGeneralPage]);

  const handleEdit = useCallback(
    async (memberId: string) => {
      if (event && event?.organizer.id !== memberId) {
        await router.push(`/event/${eventId}/setting/role/${memberId}`);
      }
    },
    [event, eventId, router],
  );

  const handleInvite = useCallback(
    async (type: 'admin' | 'general') => {
      await router.push(`/event/${eventId}/setting/role/invite?type=${type}`);
    },
    [eventId, router],
  );

  return (
    <EventLayout
      header={{
        title: '역할',
        textColor: 'black',
        color: 'white',
        left: headerLeft,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <section className="flex flex-col pb-[12px]">
          <header className="flex flex-row px-[22px] py-[8px] bg-gray">
            <span className="font-[400] text-[14px] text-black">관리자</span>
          </header>

          {adminList.map((member) => (
            <div
              key={member.id}
              className="flex flex-1 flex-row px-[22px] py-[16px] border-b-[1px] border-b-gray items-center justify-between"
              onClick={() => handleEdit(member.id)}
            >
              <span className="font-[400] text-[16px] text-black">
                {member.nickname}
              </span>

              <Conditional condition={event?.organizer.id !== member.id}>
                <Image
                  src="/icons/chevron-right.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </Conditional>
            </div>
          ))}

          <div
            className="flex flex-1 flex-row px-[22px] py-[16px] border-b-[1px] border-b-mint items-center justify-between"
            onClick={() => handleInvite('admin')}
          >
            <span className="font-[400] text-[16px] text-mint">초대하기</span>

            <PlusIcon color="#9BD1DD" />
          </div>

          <Conditional condition={hasMoreAdmin}>
            <div
              className="flex w-[calc(100%-40px)] py-[14px] mx-[20px] my-[6px] rounded-[10px] items-center justify-center bg-gray"
              onClick={handleNextAdmin}
            >
              <span className="font-[400] text-[14px] text-black">더보기</span>
            </div>
          </Conditional>
        </section>

        <section className="flex flex-col">
          <header className="flex flex-row px-[22px] py-[8px] bg-gray">
            <span className="font-[400] text-[14px] text-black">일반</span>
          </header>

          {generalList.map((member) => (
            <div
              key={member.id}
              className="flex flex-1 flex-row px-[22px] py-[16px] border-b-[1px] border-b-gray items-center justify-between"
              onClick={() => handleEdit(member.id)}
            >
              <span className="font-[400] text-[16px] text-black">
                {member.nickname}
              </span>

              <Image
                src="/icons/chevron-right.svg"
                width={24}
                height={24}
                alt=""
              />
            </div>
          ))}

          <div
            className="flex flex-1 flex-row px-[22px] py-[16px] border-b-[1px] border-b-mint items-center justify-between"
            onClick={() => handleInvite('general')}
          >
            <span className="font-[400] text-[16px] text-mint">초대하기</span>

            <PlusIcon color="#9BD1DD" />
          </div>

          <Conditional condition={hasMoreGeneral}>
            <div
              className="flex w-[calc(100%-40px)] py-[14px] mx-[20px] my-[6px] rounded-[10px] items-center justify-center bg-gray"
              onClick={handleNextGeneral}
            >
              <span className="font-[400] text-[14px] text-black">더보기</span>
            </div>
          </Conditional>
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
