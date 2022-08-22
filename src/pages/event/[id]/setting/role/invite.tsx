import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import EventLayout from '@/components/layout/EventLayout';
import CustomInput from '@/components/form/CustomInput';
import PlusIcon from '@/components/icons/PlusIcon';
import CheckButton from '@/components/button/CheckButton';

const emailReg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

interface InviteProps {
  eventId: string;
  type: 'admin' | 'general';
}

const Invite: NextPage<InviteProps> = ({eventId, type}) => {
  const router = useRouter();

  const {data: event} = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const {data: me} = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );

  const [emailList, setEmailList] = useState<string[]>(['']);

  useEffect(() => {
    if (event && me && event.organizer.id !== me.id) {
      router.back();
    }
  }, [event, me, router]);

  const handleChangeEmail = useCallback((index: number) => {
    return (newValue: string) => {
      setEmailList((prev) =>
        prev.map((it, idx) => (idx === index ? newValue : it)),
      );
    };
  }, []);

  const emailForms = useMemo(
    () => (
      <>
        {Array.from({length: emailList.length}).map((value, index) => (
          <CustomInput
            key={index}
            value={emailList[index]}
            setValue={handleChangeEmail(index)}
          />
        ))}
      </>
    ),
    [emailList, handleChangeEmail],
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack}/>,
    [handleBack],
  );

  const handleChange = useCallback(async () => {
    await MeetworkApi.invitation.invite({
      eventId,
      invitationInformations: emailList
        .filter((it) => emailReg.test(it.trim()))
        .map((email) => ({
          email,
          isAdmin: type === 'admin',
        })),
    });

    router.back();
  }, [emailList, eventId, router, type]);

  const headerRight = useMemo(
    () => <CheckButton onClick={handleChange}/>,
    [handleChange],
  );

  const handleAppend = useCallback(() => {
    setEmailList((prev) => [...prev, '']);
  }, []);

  return (
    <EventLayout
      header={{
        title: `${type === 'admin' ? '관리자' : '참가자'} 초대하기`,
        textColor: 'black',
        color: 'white',
        left: headerLeft,
        right: headerRight,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col p-[20px]">
        <header className="flex flex-col mb-[8px]">
          <span className="font-[400] text-[20px] text-black">
            공간에 초대하고 싶은
          </span>
          <span className="font-[400] text-[20px] text-black">
            {type === 'admin' ? '관리자' : '참가자'}의 이메일을 적어주세요.
          </span>
          <span className="font-[400] text-[14px] text-black">
            {type === 'admin'
              ? '관리자는 채널(게시판 포함)에 대한 권한을 가져요!'
              : '참가자는 채팅 채널에 대한 권한만 가질 수 있어요!'}
          </span>
        </header>

        {emailForms}

        <div
          className="flex flex-row px-[4px] py-[16px] border-b-[1px] border-b-mint items-center justify-between"
          onClick={handleAppend}
        >
          <span className="font-[400] text-[18px] text-mint">추가하기</span>
          <PlusIcon color="#9BD1DD"/>
        </div>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const {id, type} = (await context.query) as { id: string; type: string };

    return {
      props: {
        eventId: id,
        type: type === 'admin' ? 'admin' : 'general',
      },
    };
  },
);

export default Invite;
