import React, { useCallback } from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';

import {
  createChannelState,
  CreateChannelStateProps,
} from '@/stores/event/create-channel';
import { Profile } from '@/domain/user/profile';
import Conditional from '@/hocs/Conditional';

interface ProfileDeleteItemProps {
  profile: Profile;
}

const ProfileDeleteItem: React.FC<ProfileDeleteItemProps> = ({ profile }) => {
  const setCreateChannel =
    useSetRecoilState<CreateChannelStateProps>(createChannelState);

  const handleDelete = useCallback(() => {
    setCreateChannel((prev) => ({
      ...prev,
      profiles: prev.profiles.filter((it) => it.id !== profile.id),
    }));
  }, [profile.id, setCreateChannel]);

  return (
    <div className="flex flex-row px-[22px] py-[12px] border-b-[1px] border-b-gray items-center">
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

      <div
        className="w-[24px] h-[24px] items-center justify-center"
        onClick={handleDelete}
      >
        <Image src="/icons/x.svg" width={24} height={24} alt="" />
      </div>
    </div>
  );
};

export default ProfileDeleteItem;
