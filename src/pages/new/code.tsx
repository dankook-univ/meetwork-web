import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import BasicLayout from '@/components/layout/BasicLayout';
import { withAuthSSR } from '@/utils/session/withAuth';
import { createEventState } from '@/stores/event/create-event';
import { MeetworkApi } from '@/operations';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import CustomInput from '@/components/form/CustomInput';
import CustomButton from '@/components/button/CustomButton';
import Conditional from '@/hocs/Conditional';

const reg = /^[a-zA-Z\-]+$/;

const Code: NextPage = () => {
  const router = useRouter();

  const [createEvent, setCreateEventState] = useRecoilState(createEventState);

  const [code, setCode] = useState<string>(createEvent.code ?? '');

  const [codeAvailable, setCodeAvailable] = useState<boolean | null>(null);

  const buttonDisabled = useMemo<boolean>(
    () => codeAvailable !== true,
    [codeAvailable],
  );

  useEffect(() => {
    if (code) {
      setCreateEventState((prev) => ({ ...prev, code }));
      setCodeAvailable(null);
      MeetworkApi.event.checkCode(code).then((res) => {
        setCodeAvailable(!res);
      });
    }
  }, [code, setCreateEventState]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const setAvailableCode = useCallback((text: string) => {
    if (text.length === 0 || reg.test(text)) {
      setCode(text);
    }
  }, []);

  const handleNext = useCallback(async () => {
    MeetworkApi.event.create({ ...createEvent, code }).then(async () => {
      setCreateEventState({
        name: '',
        code: '',
        meetingCode: null,
        organizerNickname: '',
        organizerBio: '',
        organizerProfileImage: null,
      });

      await router.push('/new/complete');
    });
  }, [createEvent, code, setCreateEventState, router]);

  return (
    <BasicLayout
      header={{
        color: 'white',
        left: headerLeft,
        title: '?????? ???????????? ?????????',
        textColor: 'black',
      }}
    >
      <div className="flex flex-1 flex-col px-[22px] py-[50px] justify-between">
        <div className="flex flex-col">
          <span className="font-[400] text-[22px] text-black">
            ?????? ????????? ?????????
          </span>
          <span className="font-[400] text-[22px] text-black mb-[18px]">
            ??????????????? ??????????????????.
          </span>

          <CustomInput
            value={code}
            setValue={setAvailableCode}
            avoidSpace={true}
            error={codeAvailable === false}
          />

          <Conditional condition={code.length === 0 || codeAvailable !== false}>
            <>
              <span className="font-[400] text-[14px] text-black mt-[8px]">
                ??????????????? ?????? ????????? ?????? ???????????? ???????????????!
              </span>
              <span className="font-[400] text-[14px] text-black">{`????????? ?????? '??????>??????>??????'?????? ??????????????????.`}</span>
            </>
          </Conditional>

          <Conditional condition={codeAvailable === false}>
            <>
              <span className="font-[400] text-[14px] text-pink mt-[8px]">
                ?????? ??????????????? ?????? ???????????? ????????? ?????????.
              </span>
              <span className="font-[400] text-[14px] text-pink">
                ?????? ??????????????? ???????????????.
              </span>
            </>
          </Conditional>
        </div>

        <CustomButton
          style="rounded-[5px] bg-mint"
          textStyle="text-white"
          label="??????"
          disable={buttonDisabled}
          onClick={handleNext}
        />
      </div>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR();

export default Code;
