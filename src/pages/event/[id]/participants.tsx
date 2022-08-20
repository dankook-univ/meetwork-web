import React, { useMemo } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import { withAuthSSR } from '@/utils/session/withAuth';
import EventLayout from '@/components/layout/EventLayout';
import useSWR from 'swr';
import { MeetworkApi } from '@/operations';
import { Profile } from '@/domain/user/profile';
import ProfileItem from '@/components/event/ProfileItem';

interface ParticipantsProps {
  eventId: string;
}

const Participants: NextPage<ParticipantsProps> = ({ eventId }) => {
  const { data: event } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );

  const participants = useMemo<Profile[]>(() => (me ? [me] : []), [me]);

  return (
    <EventLayout header={{ title: '멤버', subTitle: event?.name ?? '' }}>
      <div className="flex flex-1 flex-col">
        {participants.map((participant) => (
          <ProfileItem
            key={participant.id}
            profile={participant}
            isMine={participant.id === me?.id}
          />
        ))}
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
