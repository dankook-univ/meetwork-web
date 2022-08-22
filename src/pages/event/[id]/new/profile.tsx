import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import { Profile } from '@/domain/user/profile';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import Separator from '@/components/event/new/Separator';
import Conditional from '@/hocs/Conditional';
import ProfileSelectItem from '@/components/event/new/ProfileSelectItem';
import _ from 'lodash';

interface ProfileScreenProps {
  eventId: string;
}

const ProfileScreen: NextPage<ProfileScreenProps> = ({ eventId }) => {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [member, setMember] = useState<Profile[]>([]);

  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { data: members } = useSWR(['/api/event/members', eventId, page], () =>
    MeetworkApi.event.members(eventId, page),
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const hasMore = useMemo<boolean>(
    () => !(members !== undefined && members.length < 10),
    [members],
  );

  useEffect(() => {
    if (me && members) {
      setMember((prev) =>
        _([...prev, ...members.filter((it) => it.id !== me?.id)])
          .uniqBy((it) => it.id)
          .value(),
      );
    }
  }, [me, members]);

  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return (
    <EventLayout
      header={{
        title: '채널 추가하기',
        color: 'white',
        textColor: 'black',
        left: headerLeft,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <Separator label="멤버 추가하기" />

        {member.map((member) => (
          <ProfileSelectItem key={member.id} profile={member} />
        ))}

        <Conditional condition={!!me && hasMore}>
          <div
            className="flex w-[calc(100%-40px)] py-[14px] mx-[20px] my-[6px] rounded-[10px] items-center justify-center bg-gray"
            onClick={handleNextPage}
          >
            <span className="font-[400] text-[14px] text-black">더보기</span>
          </div>
        </Conditional>
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

export default ProfileScreen;
