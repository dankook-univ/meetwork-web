import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Profile } from '@/domain/user/profile';
import Image from 'next/image';
import Conditional from '@/hocs/Conditional';

interface ProfileInfoModalProps {
  profile: Profile;
}

const ProfileInfoModal: React.FC<ProfileInfoModalProps> = ({ profile }) => {
  const router = useRouter();

  const visible = useMemo<boolean>(
    () => router.asPath.includes(`?profile=${profile.id}`),
    [profile.id, router.asPath],
  );

  const handleClose = useCallback(
    async (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        await router.replace(
          router.asPath.replace(`?profile=${profile.id}`, ''),
        );
      }
    },
    [profile.id, router],
  );

  const handleUpdate = useCallback(async () => {
    const { id } = (await router.query) as { id: string };

    await router.push(`/event/${id}/profile`);
  }, [router]);

  return (
    <div
      className={classNames(
        'absolute top-0 z-[100] flex flex-col w-screen h-screen px-[56px] items-center justify-center bg-[rgba(54,54,54,0.3)]',
        `${visible ? '' : 'hidden'}`,
      )}
      onTouchEnd={handleClose}
    >
      <section className="flex flex-col w-full pt-[46px] pb-[32px] rounded-[18px] items-center bg-white z-[200]">
        <div className="w-[132px] h-[132px] mb-[26px] items-center justify-center">
          <Conditional condition={profile.profileImage !== null}>
            <Image
              className="rounded-[100%]"
              src={profile.profileImage?.url ?? ''}
              width={132}
              height={132}
              alt=""
            />
          </Conditional>

          <Conditional condition={profile.profileImage === null}>
            <div className="w-[132px] h-[132px] rounded-[100%] bg-mint" />
          </Conditional>
        </div>

        <span className="font-[400] text-[20px] text-black mb-[12px]">
          {profile.nickname}
        </span>
        <span className="font-[400] text-[14px] text-black mb-[40px]">
          {profile?.bio ?? ''}
        </span>

        <Image
          src="/icons/settings.svg"
          width={24}
          height={24}
          alt=""
          onClick={handleUpdate}
        />
      </section>
    </div>
  );
};

export default ProfileInfoModal;
