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

const Code: NextPage = () => {
  const router = useRouter();

  const [createEvent, setCreateEventState] = useRecoilState(createEventState);

  const [code, setCode] = useState<string>(createEvent.code);

  const buttonDisabled = useMemo<boolean>(() => code.length === 0, [code]);

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
      code,
    }));

    await router.push('/new/complete');
  }, [setCreateEventState, router, code]);

  return (
    <BasicLayout
      header={{
        color: 'white',
        left: headerLeft,
        title: '공간 초대코드 만들기',
        textColor: 'black',
      }}
    >
      <div className="flex flex-1 flex-col px-[22px] py-[50px] justify-between">
        <div className="flex flex-col">
          <span className="font-[400] text-[22px] text-black">
            새로 만드는 공간의
          </span>
          <span className="font-[400] text-[22px] text-black mb-[18px]">
            초대코드를 만들어주세요.
          </span>

          <CustomInput value={code} setValue={setCode} />

          <span className="font-[400] text-[14px] text-black mt-[8px]">
            초대코드를 통해 참가할 경우 참가자로 배정되어요!
          </span>
          <span className="font-[400] text-[14px] text-black">{`역할은 추후 '행사>관리>역할'에서 수정해주세요.`}</span>
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

export default Code;
