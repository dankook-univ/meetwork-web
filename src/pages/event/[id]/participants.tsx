import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import { Profile } from '@/domain/user/profile';

import EventLayout from '@/components/layout/EventLayout';
import ProfileItem from '@/components/event/ProfileItem';
import Conditional from '@/hocs/Conditional';

interface ParticipantsProps {
  eventId: string;
}

const Participants: NextPage<ParticipantsProps> = ({ eventId }) => {
  const [page, setPage] = useState<number>(1);
  const [member, setMember] = useState<Profile[]>([]);

  const { data: event } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { data: members } = useSWR(['/api/event/members', eventId, page], () =>
    MeetworkApi.event.members(eventId, page),
  );

  const participants = useMemo<Profile[]>(
    () => (me ? [me, ...member] : member),
    [me, member],
  );

  const hasMore = useMemo<boolean>(
    () => !(members !== undefined && members.length < 10),
    [members],
  );

  useEffect(() => {
    if (me && members) {
      setMember((prev) => [
        ...prev,
        ...members.filter((it) => it.id !== me?.id),
      ]);
    }
  }, [me, members]);

  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return (
    <EventLayout header={{ title: '멤버', subTitle: event?.name ?? '' }}>
      <div className="flex flex-1 flex-col w-full">
        {participants.map((participant, index) => (
          <ProfileItem
            key={index}
            profile={participant}
            isMine={participant?.id === me?.id}
          />
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

export default Participants;
