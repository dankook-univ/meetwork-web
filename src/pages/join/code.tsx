import React, { useCallback, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { joinEventState } from '@/stores/event/join-event';
import { withAuthSSR } from '@/utils/session/withAuth';

import BasicLayout from '@/components/layout/BasicLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import CustomInput from '@/components/form/CustomInput';
import CustomButton from '@/components/button/CustomButton';

const Code: NextPage = () => {
  const router = useRouter();

  const [joinEvent, setJoinEvent] = useRecoilState(joinEventState);

  const [code, setCode] = useState<string>(joinEvent?.code ?? '');

  const buttonDisabled = useMemo<boolean>(
    () => code.trim().length === 0,
    [code],
  );

  const handleBack = useCallback(() => {
    setJoinEvent({
      code: '',
      nickname: '',
    });

    router.back();
  }, [router, setJoinEvent]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleNext = useCallback(async () => {
    setJoinEvent((prev) => ({ ...prev, code }));

    await router.push('/join/profile');
  }, [code, router, setJoinEvent]);

  return (
    <BasicLayout
      header={{
        color: 'white',
        left: headerLeft,
        title: '공간 추가하기',
        textColor: 'black',
      }}
    >
      <div className="flex flex-1 flex-col px-[22px] py-[50px] justify-between">
        <div className="flex flex-col">
          <span className="font-[400] text-[22px] text-black">
            들어가고 싶은 공간의
          </span>
          <span className="font-[400] text-[22px] text-black mb-[18px]">
            코드를 적어주세요.
          </span>

          <CustomInput
            value={code}
            setValue={setCode}
            avoidSpace={true}
            placeholder="코드를 적어주세요."
          />
        </div>

        <CustomButton
          style="rounded-[5px] bg-mint"
          textStyle="text-white"
          label="참가하기"
          disable={buttonDisabled}
          onClick={handleNext}
        />
      </div>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Code;
