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

interface NameProps {
  eventId: string;
}

const Name: NextPage<NameProps> = ({ eventId }) => {
  const router = useRouter();

  const { data: event, mutate } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );

  const [name, setName] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    if (event && name === null) {
      setName(event.name);
    }

    if (event && code === null) {
      setCode(event.code);
    }
  }, [event, name, code]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleChange = useCallback(async () => {
    if (name && code) {
      await MeetworkApi.event.update(eventId, { name, code });
      await mutate();

      router.back();
    }
  }, [name, code, eventId, mutate, router]);

  const headerRight = useMemo(
    () => <CheckButton onClick={handleChange} />,
    [handleChange],
  );

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
            <CustomInput
              value={code as string}
              setValue={setCode}
              placeholder="초대코드를 적어주세요."
            />
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
