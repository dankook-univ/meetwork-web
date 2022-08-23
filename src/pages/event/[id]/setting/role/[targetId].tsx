import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import ReactSwitch from 'react-switch';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import { Profile } from '@/domain/user/profile';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import EventLayout from '@/components/layout/EventLayout';
import CheckButton from '@/components/button/CheckButton';

interface TargetIdProps {
  eventId: string;
  memberId: string;
}

const TargetId: NextPage<TargetIdProps> = ({ eventId, memberId }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const { data: event } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { data: member, mutate: mutateMember } = useSWR(
    ['/api/event/member', eventId, memberId],
    () => MeetworkApi.event.member(eventId, memberId),
  );

  useEffect(() => {
    if (event && me && event.organizer.id !== me.id) {
      router.back();
    }
  }, [event, me, router]);

  useEffect(() => {
    if (member && isAdmin === null) {
      setIsAdmin(member.isAdmin);
    }
  }, [isAdmin, member]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleChange = useCallback(async () => {
    if (isAdmin !== null) {
      await MeetworkApi.event.updateAdmin({
        eventId,
        profileId: memberId,
        isAdmin: isAdmin as boolean,
      });
      await mutateMember();
      if (isAdmin) {
        await mutate(
          ['/api/event/members', eventId, 1, 'general'],
          (prev: Profile[]) => prev.filter((it) => it.id !== memberId),
        );
      } else {
        await mutate(
          ['/api/event/members', eventId, 1, 'admin'],
          (prev: Profile[]) => prev.filter((it) => it.id !== memberId),
        );
      }

      await router.replace(`/event/${eventId}/setting/role`);
    }
  }, [eventId, isAdmin, memberId, mutate, mutateMember, router]);

  const headerRight = useMemo(
    () => <CheckButton onClick={handleChange} />,
    [handleChange],
  );

  const handleOnSwitch = useCallback((isAdmin: boolean) => {
    setIsAdmin(isAdmin);
  }, []);

  const handleRelease = useCallback(async () => {
    if (member !== undefined) {
      await MeetworkApi.event.release({ eventId, profileId: memberId });
      if (member?.isAdmin) {
        await mutate(
          ['/api/event/members', eventId, 1, 'admin'],
          (prev: Profile[]) => prev.filter((it) => it.id !== memberId),
        );
      } else {
        await mutate(
          ['/api/event/members', eventId, 1, 'general'],
          (prev: Profile[]) => prev.filter((it) => it.id !== memberId),
        );
      }

      router.back();
    }
  }, [eventId, member, memberId, mutate, router]);

  return (
    <EventLayout
      header={{
        title: '역할',
        textColor: 'black',
        color: 'white',
        left: headerLeft,
        right: headerRight,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex px-[22px] py-[16px]">
          <span className="font-[600] text-[18px] text-black">
            {member?.nickname}
          </span>
        </div>

        <section className="flex flex-col">
          <header className="flex flex-row px-[22px] py-[8px] bg-gray">
            <span className="font-[400] text-[14px] text-black">역할</span>
          </header>

          <div className="flex flex-row px-[22px] py-[16px] items-center justify-between">
            <span className="font-[400] font-[16px] text-black">관리자</span>

            <ReactSwitch
              checked={isAdmin ?? false}
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
        </section>

        <section className="flex flex-col">
          <header className="flex flex-row px-[22px] py-[8px] bg-gray">
            <span className="font-[400] text-[14px] text-black">방출하기</span>
          </header>

          <div
            className="flex flex-row px-[22px] py-[16px] border-b-[1px] border-b-gray items-center"
            onClick={handleRelease}
          >
            <span className="font-[400] font-[16px] text-pink">방출하기</span>
          </div>
        </section>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const { id, targetId } = (await context.query) as {
      id: string;
      targetId: string;
    };

    return {
      props: {
        eventId: id,
        memberId: targetId,
      },
    };
  },
);

export default TargetId;
