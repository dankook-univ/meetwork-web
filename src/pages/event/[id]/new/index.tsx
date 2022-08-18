import React, { useCallback, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReactSwitch from 'react-switch';
import classNames from 'classnames';

import { withAuthSSR } from '@/utils/session/withAuth';
import { MeetworkApi } from '@/operations';
import Conditional from '@/hocs/Conditional';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import Separator from '@/components/event/new/Separator';
import CustomInput from '@/components/form/CustomInput';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import CustomButton from '@/components/button/CustomButton';

interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
  const router = useRouter();

  const [type, setType] = useState<'board' | 'channel'>('channel');
  const [name, setName] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleCreate = useCallback(async () => {
    if (type === 'channel' && name.trim().length > 0) {
      const { id } = router.query as { id: string };

      MeetworkApi.chat
        .createRoom(id, {
          name,
          isPrivate,
          participantIds: [],
        })
        .then(async () => {
          await router.replace(`/event/${id}`);
        });
    }
  }, [router, type, name, isPrivate]);

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
      setIsPrivate(checked);
    },
    [setIsPrivate],
  );

  return (
    <EventLayout
      header={{
        title: '채널 추가하기',
        color: 'white',
        textColor: 'black',
        left: headerLeft,
        right: headerRight,
      }}
    >
      <div className="flex flex-1 flex-col">
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

        <Separator label="채널 이름" />
        <div className="px-[10px] py-[8px]">
          <CustomInput
            value={name}
            setValue={setName}
            placeholder="채널 이름을 입력해주세요."
            textStyle="font-[400] text-[16px]"
          />
        </div>

        <Conditional condition={type === 'channel'}>
          <>
            <Separator label="채널 권한" />
            <div className="flex flex-row px-[22px] py-[16px] items-center justify-between">
              <span className="font-[400] text-[16px] text-black">
                비공개 채널
              </span>
              <ReactSwitch
                checked={isPrivate}
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

            <Separator label="채널에 접근할 수 있는 멤버" />
            <div className="flex flex-row px-[22px] py-[16px] border-b-[1px] border-gray items-center justify-between">
              <span className="font-[400] text-[16px] text-mint">추가하기</span>
              <ArrowRightIcon color="#9BD1DD" />
            </div>
          </>
        </Conditional>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Index;
