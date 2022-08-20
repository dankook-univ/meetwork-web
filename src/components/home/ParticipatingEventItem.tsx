import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Event } from '@/domain/event/event';
import { MeetworkApi } from '@/operations';

interface ParticipatingEventItemProps {
  event: Event;
}

const ParticipatingEventItem: React.FC<ParticipatingEventItemProps> = ({
  event,
}) => {
  const router = useRouter();

  const { data } = useSWR(['/api/event/me', event.id], () =>
    MeetworkApi.event.getProfile(event.id),
  );

  const handleOnClick = useCallback(async () => {
    await router.push(`/event/${event.id}`);
  }, [router, event]);

  return (
    <div
      className="flex flex-row w-screen p-[16px] items-center"
      onClick={handleOnClick}
    >
      <div className="flex flex-1 flex-col max-w-[calc(100vw-56px)]">
        <span className="font-[600] text-[16px] text-black truncate">
          {event.name}
        </span>
        <span className="font-[400] text-[16px] text-black">
          {data?.nickname ?? ''}
        </span>
      </div>

      <div className="w-[24px] h-[24px] items-center justify-center">
        <Image src="/icons/chevron-right.svg" width={24} height={24} alt="" />
      </div>
    </div>
  );
};

export default ParticipatingEventItem;
