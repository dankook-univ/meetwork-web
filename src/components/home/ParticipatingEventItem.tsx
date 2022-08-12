import React from 'react';

import { Event } from '@/domain/event/event';

interface ParticipatingEventItemProps {
  event: Event;
}

const ParticipatingEventItem: React.FC<ParticipatingEventItemProps> = ({
  event,
}) => {
  return (
    <div className="flex flex-row p-[16px]">
      <div className="flex flex-col">
        <span>{event.name}</span>
      </div>
    </div>
  );
};

export default ParticipatingEventItem;
