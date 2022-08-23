import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

import { withAuthSSR } from '@/utils/session/withAuth';
import { createEventState } from '@/stores/event/create-event';
import BasicLayout from '@/components/layout/BasicLayout';
import Conditional from '@/hocs/Conditional';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import CustomInput from '@/components/form/CustomInput';
import CustomButton from '@/components/button/CustomButton';
import CameraIcon from '@/components/icons/CameraIcon';

const Profile: NextPage = () => {
  const router = useRouter();

  const [createEvent, setCreateEventState] = useRecoilState(createEventState);

  const [image, setImage] = useState<Blob | null>(
    createEvent?.organizerProfileImage as Blob,
  );
  const [nickname, setNickname] = useState<string>(
    createEvent?.organizerNickname ?? '',
  );
  const [bio, setBio] = useState<string>(createEvent?.organizerBio ?? '');
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

  const handleOnBack = useCallback(async () => {
    router.back();
    setCreateEventState({
      name: '',
      code: '',
      organizerNickname: '',
    });
  }, [router, setCreateEventState]);

  const headerLeft = useMemo(
    () => <HeaderBackButton color="black" onClick={handleOnBack} />,
    [handleOnBack],
  );

  const handleImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setImage(event.target.files?.[0] ?? null);
    },
    [setImage],
  );

  const handleOnNext = useCallback(async () => {
    setCreateEventState((prev) => ({
      ...prev,
      organizerProfileImage: image as File,
      organizerNickname: nickname,
      organizerBio: bio,
    }));

    await router.push('/new/name');
  }, [setCreateEventState, router, image, nickname, bio]);

  return (
    <BasicLayout
      header={{
        title: '프로필 설정',
        left: headerLeft,
        color: 'white',
        textColor: 'black',
      }}
    >
      <div className="flex flex-1 flex-col px-[22px] py-[50px] justify-between">
        <div className="flex flex-1 flex-col items-center justify-center">
          <label htmlFor="profile-image">
            <Conditional condition={imagePath === null}>
              <div className="flex w-[132px] h-[132px] rounded-[100%] shadow-[0_0_4px_rgba(0,0,0,0.1)] items-center justify-center bg-primary">
                <CameraIcon color="#FCFCFC" />
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
        </div>

        <CustomButton
          style="rounded-[5px] mt-[74px] bg-mint"
          textStyle="text-white"
          label="참가하기"
          disable={buttonDisabled}
          onClick={handleOnNext}
        />
      </div>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Profile;
