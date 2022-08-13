import React, { useCallback } from 'react';

import { Event } from '@/domain/event/event';
import { useRouter } from 'next/router';

interface ParticipatingEventItemProps {
  event: Event;
}

const ParticipatingEventItem: React.FC<ParticipatingEventItemProps> = ({
  event,
}) => {
  const router = useRouter();

  const handleOnClick = useCallback(async () => {
    await router.push(`/event/${event.id}`);
  }, [router, event]);

  return (
    <div className="flex flex-row p-[16px] mt-[20px]" onClick={handleOnClick}>
      <div className="flex flex-col">
        <span>{event.name}</span>
      </div>
    </div>
  );
};

export default ParticipatingEventItem;
