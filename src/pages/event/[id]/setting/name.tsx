import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import CheckButton from '@/components/button/CheckButton';
import CustomInput from '@/components/form/CustomInput';
import Conditional from '@/hocs/Conditional';

const reg = /^[a-zA-Z\-]+$/;

interface NameProps {
  eventId: string;
}

const Name: NextPage<NameProps> = ({ eventId }) => {
  const router = useRouter();

  const { data: event, mutate } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );

  const [name, setName] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [codeAvailable, setCodeAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (event && me && event.organizer.id !== me.id) {
      router.back();
    }
  }, [event, me, router]);

  useEffect(() => {
    if (event && name === null) {
      setName(event.name);
    }

    if (event && code === null) {
      setCode(event.code);
    }
  }, [event, name, code]);

  useEffect(() => {
    if (code !== null && code.trim().length > 0) {
      if (event?.code === code) {
        setCodeAvailable(true);
      } else {
        MeetworkApi.event.checkCode(code).then((res) => {
          setCodeAvailable(!res);
        });
      }
    } else {
      setCodeAvailable(false);
    }
  }, [code, event?.code]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleChange = useCallback(async () => {
    if (name && code && codeAvailable) {
      await MeetworkApi.event.update(eventId, { name, code });
      await mutate();

      router.back();
    }
  }, [name, code, codeAvailable, eventId, mutate, router]);

  const headerRight = useMemo(
    () => <CheckButton onClick={handleChange} />,
    [handleChange],
  );

  const setAvailableCode = useCallback((text: string) => {
    if (text.length === 0 || reg.test(text)) {
      setCode(text);
    }
  }, []);

  return (
    <EventLayout
      header={{
        title: '공간명 변경',
        textColor: 'black',
        color: 'white',
        left: headerLeft,
        right: headerRight,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col px-[20px] py-[24px] border-t-[3px] border-t-gray">
        <div className="flex flex-col mb-[65px]">
          <span className="font-[400] text-[22px] text-black">
            바꾸고 싶은 공간명으로
          </span>
          <span className="font-[400] text-[22px] text-black mb-[18px]">
            다시 적어주세요.
          </span>

          <Conditional condition={name !== null}>
            <CustomInput
              value={name as string}
              setValue={setName}
              placeholder="공간명을 적어주세요."
            />
          </Conditional>
        </div>

        <div className="flex flex-col mb-[65px]">
          <span className="font-[400] text-[22px] text-black">
            바꾸고 싶은 초대코드로
          </span>
          <span className="font-[400] text-[22px] text-black mb-[18px]">
            다시 적어주세요.
          </span>

          <Conditional condition={name !== null}>
            <>
              <CustomInput
                value={code as string}
                setValue={setAvailableCode}
                placeholder="초대코드를 적어주세요."
                avoidSpace={true}
                error={
                  !!code && code?.trim().length > 0 && codeAvailable === false
                }
              />

              <Conditional
                condition={
                  !!code && code?.trim().length > 0 && codeAvailable === false
                }
              >
                <>
                  <span className="font-[400] text-[14px] text-pink mt-[8px]">
                    해당 초대코드로 이미 만들어진 공간이 있어요.
                  </span>
                  <span className="font-[400] text-[14px] text-pink">
                    다른 초대코드를 적어주세요.
                  </span>
                </>
              </Conditional>
            </>
          </Conditional>
        </div>
      </div>
    </EventLayout>
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

export default Name;
