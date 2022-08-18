import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Client } from '@stomp/stompjs';

import { withAuthSSR } from '@/utils/session/withAuth';
import { MeetworkApi } from '@/operations';
import { ChatMessage } from '@/domain/chat/chat-message';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import InputMessage from '@/components/event/InputMessage';
import MessageItem from '@/components/event/MessageItem';

interface ChannelProps {
  token: string;
  baseUrl: string;
  eventId: string;
  channelId: string;
}

const Channel: NextPage<ChannelProps> = ({
                                           token,
                                           baseUrl,
                                           eventId,
                                           channelId,
                                         }) => {
  const router = useRouter();
  const client = useRef<Client>();
  const messageRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const {data: event} = useSWR(`/api/event/${eventId}`, () =>
    MeetworkApi.event.get(eventId),
  );
  const {data: me} = useSWR(`/api/user/me`, MeetworkApi.user.me);
  const {data: room} = useSWR([`/api/chat/${eventId}/${channelId}`], () =>
    MeetworkApi.chat.getChatRoom(eventId, channelId),
  );
  const {data: messageList} = useSWR(
    `/api/chat/${eventId}/${channelId}/messages`,
    () => MeetworkApi.chat.getMessages(eventId, channelId),
  );

  useEffect(() => {
    if (messageList) {
      setMessages(messageList);
    }
  }, [messageList]);

  const connect = useCallback(() => {
    client.current = new Client({
      brokerURL: baseUrl,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        client.current?.subscribe(`/subscribe/chat/${me?.id}`, (res) => {
          const newMessage = JSON.parse(res.body) as ChatMessage;
          if (newMessage.room.id === channelId) {
            setMessages((prev) => [newMessage, ...prev]);
          }
        });
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.current.activate();
  }, [baseUrl, channelId, me?.id, token]);

  useEffect(() => {
    connect();

    return () => {
      client.current?.deactivate();
    };
  }, [connect]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages.length]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton color="white" onClick={handleBack}/>,
    [handleBack],
  );

  return (
    <EventLayout
      header={{
        title: room ? `${room?.name} ${room?.participants.length}명` : '',
        subTitle: event?.name ?? '',
        left: headerLeft,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col-reverse">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message}/>
          ))}
        </div>

        <div className="bottom-[-74px] h-0" ref={messageRef}/>
        <InputMessage eventId={eventId} channelId={channelId}/>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const {id, channelId} = await context.query;

    return {
      props: {
        token: context.req.session.token?.accessToken,
        baseUrl:
          (process.env.BASE_URL as string).replace('http://', 'ws://') + '/ws',
        eventId: id,
        channelId,
      } as ChannelProps,
    };
  },
);

export default Channel;
