import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import { Board } from '@/domain/board';
import { ChatRoom } from '@/domain/chat/chat-room';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import BoardItem from '@/components/event/BoardItem';
import ChannelItem from '@/components/event/ChannelItem';

interface IndexProps {
  eventId: string;
}

const Index: NextPage<IndexProps> = ({ eventId }) => {
  const router = useRouter();

  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { data: board } = useSWR(['/api/board', eventId], () =>
    MeetworkApi.board.list(eventId),
  );
  const { data: channel } = useSWR(['/api/chat', eventId], () =>
    MeetworkApi.chat.list(eventId),
  );

  const boardList = useMemo<Board[]>(() => board ?? [], [board]);
  const channelList = useMemo<ChatRoom[]>(
    () =>
      me?.isAdmin
        ? channel ?? []
        : channel
        ? channel?.filter((it) => it.organizer.id === me?.id)
        : [],
    [channel, me],
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleInfo = useCallback(
    async (targetId: string, type: 'board' | 'channel') => {
      await router.push(
        `/event/${eventId}/setting/channel/${targetId}?type=${type}`,
      );
    },
    [eventId, router],
  );

  return (
    <EventLayout
      header={{
        title: '채널',
        textColor: 'black',
        color: 'white',
        left: headerLeft,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <section className="flex flex-col">
          <header className="flex flex-row px-[22px] py-[8px] bg-gray">
            <span className="font-[400] text-[14px] text-black">게시판</span>
          </header>

          {boardList.map((board) => (
            <div key={board.id} onClick={() => handleInfo(board.id, 'board')}>
              <BoardItem board={board} disable={true} />
            </div>
          ))}
        </section>

        <section className="flex flex-col">
          <header className="flex flex-row px-[22px] py-[8px] bg-gray">
            <span className="font-[400] text-[14px] text-black">채팅</span>
          </header>

          {channelList.map((channel) => (
            <div
              key={channel.id}
              onClick={() => handleInfo(channel.id, 'channel')}
            >
              <ChannelItem channel={channel} disable={true} />
            </div>
          ))}
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
