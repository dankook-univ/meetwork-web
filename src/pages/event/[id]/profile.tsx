import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import BasicLayout from '@/components/layout/BasicLayout';
import Conditional from '@/hocs/Conditional';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import CustomInput from '@/components/form/CustomInput';
import CustomButton from '@/components/button/CustomButton';
import CameraIcon from '@/components/icons/CameraIcon';

interface ProfileProps {
  eventId: string;
}

const Profile: NextPage<ProfileProps> = ({ eventId }) => {
  const router = useRouter();

  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
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
    if (me) {
      setImagePath(me.profileImage?.url ?? null);
      setNickname(me.nickname);
      setBio(me?.bio ?? '');
    }
  }, [me]);

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
  }, [router]);

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

  const handleUpdate = useCallback(async () => {
    if (me) {
      await MeetworkApi.profile.update({
        profileId: me?.id,
        nickname,
        bio,
        profileImage: image,
        isProfileImageDeleted: false,
      });

      await router.back();
    }
  }, [bio, image, me, nickname, router]);

  return (
    <BasicLayout
      header={{
        title: '프로필 편집',
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
          label="확인"
          disable={buttonDisabled}
          onClick={handleUpdate}
        />
      </div>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const { id } = (await context.query) as { id: string };

    return {
      props: {
        eventId: id,
      },
    };
  },
);

export default Profile;
