import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import classNames from 'classnames';

import { MeetworkApi } from '@/operations';
import Conditional from '@/hocs/Conditional';

import CustomInput from '@/components/form/CustomInput';
import CustomButton from '@/components/button/CustomButton';

interface CreateProfileModalProps {
  eventId: string;
}

const CreateProfileModal: React.FC<CreateProfileModalProps> = ({ eventId }) => {
  const router = useRouter();

  const { data: me } = useSWR(['/api/user/me'], MeetworkApi.user.me);
  const { mutate } = useSWR(
    ['/api/invitation/list', me?.id],
    me?.id ? () => MeetworkApi.invitation.list(me?.id) : null,
  );

  const visible = useMemo<boolean>(
    () => router.asPath.includes('?profile=true'),
    [router],
  );

  const [image, setImage] = useState<Blob | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [imagePath, setImagePath] = useState<string | null>(null);

  const buttonDisabled = useMemo<boolean>(
    () => nickname.length === 0,
    [nickname],
  );

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setImagePath(reader.result as string);
      };
    } else {
      setImagePath(null);
    }
  }, [image]);

  const handleImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setImage(event.target.files?.[0] ?? null);
    },
    [setImage],
  );

  const handleClose = useCallback(
    async (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        await router.replace(router.asPath.replace('?profile=true', ''));
      }
    },
    [router],
  );

  const handleOnNext = useCallback(async () => {
    await MeetworkApi.invitation.join(eventId, {
      nickname,
      bio,
      profileImage: image,
    });
    await mutate();

    await router.replace(router.asPath.replace('?profile=true', ''));
  }, [eventId, nickname, bio, image, mutate, router]);

  return (
    <div
      className={classNames(
        `absolute top-0 z-[200] flex flex-col w-screen h-screen items-center justify-center bg-[rgba(54,54,54,0.3)]`,
        `${visible ? '' : 'hidden'}`,
      )}
    >
      <div
        className="flex flex-1 flex-col w-full px-[28px] py-[50px] items-center justify-center"
        onTouchEnd={handleClose}
      >
        <div className="flex flex-col w-full px-[20px] pt-[40px] pb-[20px] rounded-[12px] items-center justify-center bg-white">
          <label htmlFor="profile-image">
            <Conditional condition={imagePath === null}>
              <div className="flex w-[132px] h-[132px] rounded-[100%] shadow-[0_0_4px_rgba(0,0,0,0.1)] items-center justify-center bg-primary">
                <Image src="/icons/camera.svg" width={24} height={24} alt="" />
              </div>
            </Conditional>

            <Conditional condition={imagePath !== null}>
              <Image
                className="flex rounded-[100%] object-cover"
                src={imagePath as string}
                width={132}
                height={132}
                alt=""
              />
            </Conditional>
          </label>

          <input
            id="profile-image"
            className="hidden"
            type="file"
            accept="image/jpg,image/jpeg,impge/png,image/gif"
            onChange={handleImage}
          />

          <span className="font-[400] text-[20px] text-lightGray mt-[30px]">
            닉네임
          </span>
          <CustomInput value={nickname} setValue={setNickname} align="center" />

          <span className="font-[400] text-[20px] text-lightGray mt-[16px]">
            상태메시지
          </span>

          <CustomInput value={bio} setValue={setBio} align="center" />

          <CustomButton
            style="w-full rounded-[10px] mt-[74px] bg-mint"
            textStyle="text-white"
            label="참가하기"
            disable={buttonDisabled}
            onClick={handleOnNext}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProfileModal;
