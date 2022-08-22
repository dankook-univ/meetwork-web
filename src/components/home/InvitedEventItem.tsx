import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { Invitation } from '@/domain/invitation';

import CreateProfileModal from '@/components/home/modal/CreateProfileModal';

interface InvitedEventItemProps {
  invitation: Invitation;
}

const InvitedEventItem: React.FC<InvitedEventItemProps> = ({ invitation }) => {
  const router = useRouter();

  const { data: me } = useSWR(['/api/user/me'], MeetworkApi.user.me);
  const { mutate } = useSWR(
    ['/api/invitation/list', me?.id],
    me?.id ? () => MeetworkApi.invitation.list(me?.id) : null,
  );

  const handleJoin = useCallback(async () => {
    await router.replace(`${router.asPath}?profile=true`);
  }, [router]);

  const handleDelete = useCallback(async () => {
    await MeetworkApi.invitation.refuse(invitation.event.id);
    await mutate();
  }, [invitation.event.id, mutate]);

  return (
    <>
      <div className="flex flex-row px-[22px] py-[12px] items-center justify-between">
        <div className="flex flex-col justify-center">
          <span className="font-[400] text-[16px] text-black">
            {invitation.event.name}
          </span>
          <span className="font-[400] text-[12px] text-lightGray">
            {invitation.isAdmin ? '관리자로 초대됨' : '참가자로 초대됨'}
          </span>
        </div>

        <div className="flex flex-row items-center">
          <div
            className="flex px-[10px] py-[8px] rounded-[10px] mr-[6px] bg-mint"
            onClick={handleJoin}
          >
            <span className="font-[400] text-[12px] text-white">참가하기</span>
          </div>

          <Image
            src="/icons/x.svg"
            width={24}
            height={24}
            alt=""
            onClick={handleDelete}
          />
        </div>
      </div>

      <CreateProfileModal eventId={invitation.event.id} />
    </>
  );
};

export default InvitedEventItem;
