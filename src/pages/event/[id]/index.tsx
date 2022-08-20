import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { withAuthSSR } from '@/utils/session/withAuth';
import { MeetworkApi } from '@/operations';
import EventLayout from '@/components/layout/EventLayout';
import ChannelItem from '@/components/event/ChannelItem';
import BoardItem from '@/components/event/BoardItem';
import SearchChatRoomModal from '@/components/event/modal/SearchChatRoomModal';

interface EventProps {
  eventId: string;
}

const Event: NextPage<EventProps> = ({ eventId }) => {
  const router = useRouter();

  const { data: event } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: boards } = useSWR(['/api/board', eventId], () =>
    MeetworkApi.board.list(eventId),
  );
  const { data: rooms } = useSWR(['/api/chat', eventId], () =>
    MeetworkApi.chat.getParticipantChatRooms(eventId),
  );

  const handleOnclick = useCallback(async () => {
    await router.push(`/event/${eventId}/new`);
  }, [eventId, router]);

  const headerRight = useMemo(
    () => (
      <div
        className="w-[24px] h-[24px] items-center justify-center"
        onClick={handleOnclick}
      >
        <Image src="/icons/plus.svg" width={24} height={24} alt="" />
      </div>
    ),
    [handleOnclick],
  );

  const handleSearch = useCallback(async () => {
    await router.replace(router.asPath + '?search=true');
  }, [router]);

  return (
    <EventLayout
      header={{
        title: event?.name ?? '',
        titleAlign: 'left',
        right: headerRight,
      }}
    >
      <div className="flex flex-1 flex-col">
        <section className="flex px-[20px] py-[14px]">
          <div
            className="flex w-full px-[18px] py-[12px] rounded-[10px] border-[1px] border-lightGray items-center bg-[#FCFCFC]"
            onClick={handleSearch}
          >
            <span className="font-[400] text-[16px] text-lightGray leading-[18.6px]">
              다음으로 이동...
            </span>
          </div>
        </section>

        <section className="flex flex-col">
          <header className="flex flex-row p-[16px] border-t-[1px] border-t-gray">
            <span className="font-[600] text-[16px] text-black">게시판</span>
          </header>

          {boards?.map((board) => (
            <BoardItem key={board.id} board={board} />
          ))}
        </section>

        <section className="flex flex-col">
          <header className="flex flex-row p-[16px] border-t-[1px] border-t-gray">
            <span className="font-[600] text-[16px] text-black">채팅</span>
          </header>

          {rooms?.map((room) => (
            <ChannelItem key={room.id} channel={room} />
          ))}
        </section>

        <SearchChatRoomModal eventId={eventId} />
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {
        eventId: (context.params as { id: string }).id,
      } as EventProps,
    };
  },
);

export default Event;
