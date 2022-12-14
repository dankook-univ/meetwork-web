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
        title: '????????? ??????',
        titleStyle: 'font-[600] text-[20px]',
        textColor: 'black',
        color: 'white',
        left: headerLeft,
        right: headerRight,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col px-[20px] py-[24px] border-t-[3px] border-t-gray">
        <div className="flex flex-col mb-[65px]">
          <span className="font-[400] text-[20px] text-black">
            ????????? ?????? ???????????????
          </span>
          <span className="font-[400] text-[20px] text-black mb-[18px]">
            ?????? ???????????????.
          </span>

          <Conditional condition={name !== null}>
            <CustomInput
              value={name as string}
              setValue={setName}
              placeholder="???????????? ???????????????."
              textStyle="font-[400] text-[18px]"
            />
          </Conditional>
        </div>

        <div className="flex flex-col mb-[65px]">
          <span className="font-[400] text-[20px] text-black">
            ????????? ?????? ???????????????
          </span>
          <span className="font-[400] text-[20px] text-black mb-[18px]">
            ?????? ???????????????.
          </span>

          <Conditional condition={name !== null}>
            <>
              <CustomInput
                value={code as string}
                setValue={setAvailableCode}
                placeholder="??????????????? ???????????????."
                textStyle="font-[400] text-[18px]"
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
                    ?????? ??????????????? ?????? ???????????? ????????? ?????????.
                  </span>
                  <span className="font-[400] text-[14px] text-pink">
                    ?????? ??????????????? ???????????????.
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
