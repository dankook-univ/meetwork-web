import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Profile } from '@/domain/user/profile';
import Conditional from '@/hocs/Conditional';

import ProfileInfoModal from '@/components/event/modal/ProfileInfoModal';

interface ProfileItemProps {
  profile: Profile;
  isMine?: boolean;
}

const ProfileItem: React.FC<ProfileItemProps> = ({
  profile,
  isMine = false,
}) => {
  const router = useRouter();

  const handleInfo = useCallback(async () => {
    await router.replace(`${router.asPath}?profile=${profile.id}`);
  }, [profile.id, router]);

  return (
    <>
      <div className="flex flex-row px-[10px] py-[12px] border-b-[1px] border-b-gray items-center">
        <div className="w-[50px] h-[50px] mr-[16px]">
          <Conditional condition={profile.profileImage !== null}>
            <Image
              className="rounded-[100%]"
              src={profile.profileImage?.url ?? ''}
              width={50}
              height={50}
              alt=""
            />
          </Conditional>

          <Conditional condition={profile.profileImage === null}>
            <div className="w-[50px] h-[50px] rounded-[100%] bg-mint" />
          </Conditional>
        </div>

        <div className="flex flex-1 flex-col">
          <span className="font-[400] text-[16px] text-black">
            {profile.nickname}
          </span>

          <Conditional condition={profile?.bio?.trim().length !== 0}>
            <span className="font-[400] text-[16px] text-lightGray mt-2px]">
              {profile?.bio ?? ''}
            </span>
          </Conditional>
        </div>

        <div className="w-[24px] h-[24px] items-center justify-center">
          <Conditional condition={isMine}>
            <Image
              src="/icons/settings.svg"
              width={24}
              height={24}
              alt=""
              onClick={handleInfo}
            />
          </Conditional>

          <Conditional condition={!isMine}>
            <Image
              src="/icons/message-circle.svg"
              width={24}
              height={24}
              alt=""
            />
          </Conditional>
        </div>
      </div>

      <ProfileInfoModal profile={profile} />
    </>
  );
};

export default ProfileItem;
