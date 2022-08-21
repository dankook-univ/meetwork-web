import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ReactSwitch from 'react-switch';

import { withAuthSSR } from '@/utils/session/withAuth';
import { MeetworkApi } from '@/operations';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import EventLayout from '@/components/layout/EventLayout';
import CustomInput from '@/components/form/CustomInput';
import Conditional from '@/hocs/Conditional';
import CheckButton from '@/components/button/CheckButton';

interface ChannelProps {
  eventId: string;
  targetId: string;
  type: 'board' | 'channel';
}

const Channel: NextPage<ChannelProps> = ({ eventId, targetId, type }) => {
  const router = useRouter();

  const [name, setName] = useState<string | null>(null);
  const [select, setSelect] = useState<boolean | null>(null);

  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { data: boards, mutate } = useSWR(
    ['/api/board', eventId],
    type === 'board' ? () => MeetworkApi.board.list(eventId) : null,
  );
  const { data: channel } = useSWR(['/api/chat', eventId, targetId], () =>
    type === 'channel' ? MeetworkApi.chat.getChatRoom(eventId, targetId) : null,
  );
  const { mutate: mutateChannel } = useSWR(['/api/chat', eventId], () =>
    type === 'channel' ? MeetworkApi.chat.list(eventId) : null,
  );

  useEffect(() => {
    if (
      me &&
      ((type === 'board' && boards) || (type === 'channel' && channel))
    ) {
      if (
        type === 'board' &&
        !(me.isAdmin && boards?.find((it) => it.id === targetId))
      ) {
        router.back();
      } else if (type === 'board') {
        setName(boards!.find((it) => it.id === targetId)!.name);
        setSelect(boards!.find((it) => it.id === targetId)!.adminOnly);
      }

      if (
        type === 'channel' &&
        !(me.isAdmin || channel?.organizer.id === me.id)
      ) {
        router.back();
      } else if (type === 'channel') {
        setName(channel!.name);
        setSelect(channel!.isPrivate);
      }
    }
  }, [me, boards, channel, type, targetId, router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleChange = useCallback(async () => {
    if (type === 'board' && name && select !== null) {
      await MeetworkApi.board.update(targetId, { name, adminOnly: select });
      await mutate();

      router.back();
    }

    if (type === 'channel' && name && select !== null) {
      await MeetworkApi.chat.update(eventId, targetId, {
        name,
        isPrivate: select,
      });

      router.back();
    }
  }, [eventId, mutate, name, router, select, targetId, type]);

  const headerRight = useMemo(
    () => <CheckButton onClick={handleChange} />,
    [handleChange],
  );

  const handleOnSwitch = useCallback((checked: boolean) => {
    setSelect(checked);
  }, []);

  const handleDelete = useCallback(async () => {
    if (type === 'board') {
      await MeetworkApi.board.delete(targetId);
      await mutate();
    }
    if (type === 'channel') {
      await MeetworkApi.chat.delete(eventId, targetId);
      await mutateChannel();

      router.back();
    }
  }, [eventId, mutate, mutateChannel, router, targetId, type]);

  return (
    <EventLayout
      header={{
        title: '채널',
        textColor: 'black',
        color: 'white',
        left: headerLeft,
        right: headerRight,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <section className="flex flex-col">
          <header className="flex flex-row px-[22px] py-[8px] bg-gray">
            <span className="font-[400] text-[14px] text-black">채널 이름</span>
          </header>

          <Conditional condition={name !== null}>
            <div className="flex px-[22px] py-[10px]">
              <CustomInput
                value={name ?? ''}
                setValue={setName}
                textStyle="font-[400] text-[16px]"
              />
            </div>
          </Conditional>
        </section>

        <section className="flex flex-col">
          <header className="flex flex-row px-[22px] py-[8px] bg-gray">
            <span className="font-[400] text-[14px] text-black">채널 권한</span>
          </header>

          <Conditional condition={select !== null}>
            <div className="flex px-[22px] py-[16px] items-center justify-between">
              <span className="font-[400] text-[16px] text-black">
                {type === 'board' ? '관리자만 글쓰기' : '비공개 채널'}
              </span>

              <ReactSwitch
                checked={select ?? false}
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
          </Conditional>
        </section>

        <section className="flex flex-col">
          <header className="flex flex-row px-[22px] py-[8px] bg-gray">
            <span className="font-[400] text-[14px] text-black">
              채널 삭제하기
            </span>
          </header>

          <div
            className="flex px-[22px] py-[16px] border-b-[1px] border-b-gray"
            onClick={handleDelete}
          >
            <span className="font-[400] text-[16px] text-pink">삭제하기</span>
          </div>
        </section>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const { id, targetId, type } = (await context.query) as {
      id: string;
      targetId: string;
      type: 'board' | 'channel';
    };

    if (!targetId || !['board', 'channel'].includes(type.trim())) {
      return {
        redirect: {
          destination: `/event/${id}/setting/channel`,
          permanent: true,
        },
      };
    }

    return {
      props: {
        eventId: id,
        targetId,
        type,
      },
    };
  },
);

export default Channel;
