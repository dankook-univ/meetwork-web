import React, { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';

import HomeLayout from '@/components/layout/HomeLayout';
import CreateEventButton from '@/components/home/button/CreateEventButton';
import CreateEventModal from '@/components/home/modal/CreateEventModal';
import InvitedEventItem from '@/components/home/InvitedEventItem';

const Notification: NextPage = () => {
  const router = useRouter();

  const { data: me } = useSWR(['/api/user/me'], MeetworkApi.user.me);
  const { data: invitation } = useSWR(
    ['/api/invitation/list', me?.id],
    me?.id ? () => MeetworkApi.invitation.list(me?.id) : null,
  );

  const handleOnCreateEvent = useCallback(async () => {
    await router.replace(router.pathname + '?popup=true');
  }, [router]);

  return (
    <HomeLayout
      header={{
        title: '알림',
        right: <CreateEventButton onClick={handleOnCreateEvent} />,
      }}
    >
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 flex w-full px-[22px] pt-[36px] bg-white z-50">
          <span className="font-[600] text-[20px] text-black">
            초대받은 공간
          </span>
        </header>

        <div className="flex flex-1 flex-col mt-[14px]">
          {invitation?.map((it) => (
            <InvitedEventItem key={it.id} invitation={it} />
          ))}
        </div>

        <CreateEventModal />
      </div>
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Notification;
