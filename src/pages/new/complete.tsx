import React, { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { withAuthSSR } from '@/utils/session/withAuth';
import { createEventState } from '@/stores/event/create-event';
import CustomButton from '@/components/button/CustomButton';
import BasicLayout from '@/components/layout/BasicLayout';

const Complete: NextPage = () => {
  const router = useRouter();

  const setCreateEventStatus = useSetRecoilState(createEventState);

  const handleNext = useCallback(async () => {
    setCreateEventStatus({
      name: '',
      code: '',
      meetingUrl: null,
      organizer: {
        profileImage: null,
        nickname: '',
        bio: '',
      },
    });

    await router.push('/');
  }, [setCreateEventStatus, router]);

  return (
    <BasicLayout
      header={{
        color: 'white',
        title: '공간 초대코드 만들기',
        textColor: 'black',
      }}
    >
      <div className="flex flex-1 flex-col px-[22px] py-[50px] justify-between">
        <div className="flex flex-col items-center">
          <span className="font-[400] text-[20px] text-black">
            공간을 개설했어요!
          </span>
          <span className="font-[400] text-[20px] text-black mb-[18px]">
            이제 멤버들을 초대해볼까요?
          </span>
        </div>

        <CustomButton
          style="rounded-[5px] bg-mint"
          label="확인"
          onClick={handleNext}
        />
      </div>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Complete;
