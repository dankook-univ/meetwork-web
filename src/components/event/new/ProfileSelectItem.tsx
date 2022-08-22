import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import _ from 'lodash';

import { Profile } from '@/domain/user/profile';
import Conditional from '@/hocs/Conditional';
import {
  createChannelState,
  CreateChannelStateProps,
} from '@/stores/event/create-channel';

interface ProfileSelectItemProps {
  profile: Profile;
}

const ProfileSelectItem: React.FC<ProfileSelectItemProps> = ({ profile }) => {
  const [createChannel, setCreateChannel] =
    useRecoilState<CreateChannelStateProps>(createChannelState);
  const [check, setCheck] = useState<boolean>(
    createChannel.profiles.find((it) => it.id === profile.id) !== undefined,
  );

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheck(event.target.checked);

      if (event.target.checked) {
        setCreateChannel((prev) => ({
          ...prev,
          profiles: _([...prev.profiles, profile])
            .unionBy((it) => it.id)
            .value(),
        }));
      } else {
        setCreateChannel((prev) => ({
          ...prev,
          profiles: prev.profiles.filter((it) => it.id !== profile.id),
        }));
      }
    },
    [profile, setCreateChannel],
  );

  return (
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
        <input
          type="checkbox"
          className={classNames(
            'form-checkbox',
            'w-[20px] h-[20px] ring-0 appearance-none',
            'default:ring-0',
            'focus:ring-0 focus:outline-0 focus:bg-white focus:checked:bg-mint',
            'checked:ring-0 checked:bg-mint',
          )}
          checked={check}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default ProfileSelectItem;
