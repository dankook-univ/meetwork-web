import React, { useCallback, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import ReactSwitch from 'react-switch';
import classNames from 'classnames';
import useSWR from 'swr';

import {
  createChannelState,
  CreateChannelStateProps,
} from '@/stores/event/create-channel';
import { withAuthSSR } from '@/utils/session/withAuth';
import { MeetworkApi } from '@/operations';
import Conditional from '@/hocs/Conditional';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import Separator from '@/components/event/new/Separator';
import CustomInput from '@/components/form/CustomInput';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import CustomButton from '@/components/button/CustomButton';
import ProfileDeleteItem from '@/components/event/new/ProfileDeleteItem';

interface IndexProps {
  eventId: string;
}

const Index: NextPage<IndexProps> = ({ eventId }) => {
  const router = useRouter();

  const [createChannel, setCreateChannel] =
    useRecoilState<CreateChannelStateProps>(createChannelState);

  const [type, setType] = useState<'board' | 'channel'>('channel');

  const { data: profile } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleCreate = useCallback(async () => {
    if (type === 'channel' && createChannel.name.trim().length > 0) {
      MeetworkApi.chat
        .createRoom(eventId, {
          name: createChannel.name,
          isPrivate: createChannel.select,
          participantIds: createChannel.profiles.map((it) => it.id),
        })
        .then(async () => {
          await router.replace(`/event/${eventId}`);
        });
    }
    if (type === 'board' && createChannel.name.trim().length > 0) {
      MeetworkApi.board
        .create({
          eventId: eventId,
          name: createChannel.name,
          adminOnly: createChannel.select,
        })
        .then(async () => {
          await router.replace(`/event/${eventId}`);
        });
    }
  }, [type, eventId, router, createChannel]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const headerRight = useMemo(
    () => (
      <div
        className="w-[24px] h-[24px] items-center justify-center"
        onClick={handleCreate}
      >
        <Image src="/icons/check.svg" width={24} height={24} alt="" />
      </div>
    ),
    [handleCreate],
  );

  const buttonStyle = useCallback(
    (state: 'board' | 'channel') =>
      type === state ? 'text-white bg-mint' : 'text-mint bg-white',
    [type],
  );

  const handleOnClickBoard = useCallback(() => {
    setType('board');
  }, [setType]);

  const handleOnClickChannel = useCallback(() => {
    setType('channel');
  }, [setType]);

  const handleOnSwitch = useCallback(
    (checked: boolean) => {
      setCreateChannel((prev) => ({
        ...prev,
        select: checked,
      }));
    },
    [setCreateChannel],
  );

  const setName = useCallback(
    (name: string) => {
      setCreateChannel((prev) => ({
        ...prev,
        name,
      }));
    },
    [setCreateChannel],
  );

  const handleSelectProfile = useCallback(async () => {
    await router.push(`/event/${eventId}/new/profile`);
  }, [eventId, router]);

  return (
    <EventLayout
      header={{
        title: '채널 추가하기',
        color: 'white',
        textColor: 'black',
        left: headerLeft,
        right: headerRight,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <Conditional condition={profile?.isAdmin ?? false}>
          <div className="flex flex-row px-[14px] py-[14px] items-center justify-between">
            <CustomButton
              style={classNames(
                `w-full mx-[6px] rounded-[10px] border-[2px] border-mint`,
                buttonStyle('board'),
              )}
              label="게시판"
              onClick={handleOnClickBoard}
            />
            <CustomButton
              style={classNames(
                `w-full mx-[6px] rounded-[10px] border-[2px] border-mint`,
                buttonStyle('channel'),
              )}
              label="채팅"
              onClick={handleOnClickChannel}
            />
          </div>
        </Conditional>

        <Separator label="채널 이름" />
        <div className="px-[22px] py-[8px]">
          <CustomInput
            value={createChannel.name}
            setValue={setName}
            placeholder="채널 이름을 입력해주세요."
            textStyle="font-[400] text-[16px]"
          />
        </div>

        <Separator label="채널 권한" />
        <div className="flex flex-row px-[22px] py-[16px] items-center justify-between">
          <span className="font-[400] text-[16px] text-black">
            {type === 'board' ? '관리자만 글쓰기' : '비공개 채널'}
          </span>
          <ReactSwitch
            checked={createChannel.select}
            onChange={handleOnSwitch}
            onColor="#9BD1DD"
            offColor="#677181"
            checkedIcon={false}
            uncheckedIcon={false}
            handleDiameter={12}
            width={32}
            height={16}
          />
        </div>

        <Conditional condition={type === 'channel'}>
          <>
            <Separator label="채널에 접근할 수 있는 멤버" />
            {createChannel.profiles.map((profile) => (
              <ProfileDeleteItem key={profile.id} profile={profile} />
            ))}
            <div
              className="flex flex-row px-[22px] py-[16px] border-b-[1px] border-gray items-center justify-between"
              onClick={handleSelectProfile}
            >
              <span className="font-[400] text-[16px] text-mint">추가하기</span>
              <ArrowRightIcon color="#9BD1DD" />
            </div>
          </>
        </Conditional>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const { id } = context.query as { id: string };

    return {
      props: {
        eventId: id,
      } as IndexProps,
    };
  },
);

export default Index;
