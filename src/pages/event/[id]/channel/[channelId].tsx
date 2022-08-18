import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { withAuthSSR } from '@/utils/session/withAuth';
import { MeetworkApi } from '@/operations';
import { ChatMessage } from '@/domain/chat/chat-message';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import InputMessage from '@/components/event/InputMessage';
import MessageItem from '@/components/event/MessageItem';

interface ChannelProps {
  eventId: string;
  channelId: string;
}

const Channel: NextPage<ChannelProps> = ({ eventId, channelId }) => {
  const router = useRouter();

  const { data: room } = useSWR([`/api/chat/${eventId}/${channelId}`], () =>
    MeetworkApi.chat.getChatRoom(eventId, channelId),
  );
  const { data: messageList } = useSWR(
    `/api/chat/${eventId}/${channelId}/messages`,
    () => MeetworkApi.chat.getMessages(eventId, channelId),
  );

  const messages = useMemo<ChatMessage[]>(
    () => (messageList !== undefined ? [...messageList] : []),
    [messageList],
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton color="white" onClick={handleBack} />,
    [handleBack],
  );

  return (
    <EventLayout
      header={{
        title: room ? `${room?.name} ${room?.participants.length}명` : '',
        left: headerLeft,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col-reverse">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </section>

        <InputMessage eventId={eventId} channelId={channelId} />
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (req: GetServerSidePropsContext) => {
    const { id, channelId } = await req.query;

    return {
      props: {
        eventId: id,
        channelId,
      } as ChannelProps,
    };
  },
);

export default Channel;
