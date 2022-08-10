import React, { useCallback, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import BasicLayout from '@/components/layout/BasicLayout';
import { withAuthSSR } from '@/utils/session/withAuth';
import { createEventState } from '@/stores/event/create-event';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import CustomInput from '@/components/form/CustomInput';
import CustomButton from '@/components/button/CustomButton';

const Name: NextPage = () => {
  const router = useRouter();

  const [createEvent, setCreateEventState] = useRecoilState(createEventState);

  const [name, setName] = useState<string>(createEvent.name);

  const buttonDisabled = useMemo<boolean>(() => name.length === 0, [name]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleNext = useCallback(async () => {
    setCreateEventState((prev) => ({
      ...prev,
      name,
    }));

    await router.push('/new/code');
  }, [setCreateEventState, router, name]);

  return (
    <BasicLayout
      header={{
        color: 'white',
        left: headerLeft,
        title: '공간 정보 입력하기',
        textColor: 'black',
      }}
    >
      <div className="flex flex-1 flex-col px-[22px] py-[50px] justify-between">
        <div className="flex flex-col">
          <span className="font-[400] text-[22px] text-black">
            새로 만드는 공간의
          </span>
          <span className="font-[400] text-[22px] text-black mb-[18px]">
            이름을 지어주세요.
          </span>

          <CustomInput value={name} setValue={setName} />
        </div>

        <CustomButton
          style="rounded-[5px] bg-mint"
          label="다음"
          disable={buttonDisabled}
          onClick={handleNext}
        />
      </div>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Name;
