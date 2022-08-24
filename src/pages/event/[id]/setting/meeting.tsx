import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import CheckButton from '@/components/button/CheckButton';
import Conditional from '@/hocs/Conditional';
import CustomInput from '@/components/form/CustomInput';

interface MeetingProps {
  eventId: string;
}

const reg = /^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}/;

const Meeting: NextPage<MeetingProps> = ({ eventId }) => {
  const router = useRouter();

  const { data: event, mutate } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );

  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (me && !me.isAdmin) {
      router.back();
    }
  }, [me, router]);

  useEffect(() => {
    if (event && url === null) {
      setUrl(event?.meetingCode ?? '');
    }
  }, [event, url]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack} />,
    [handleBack],
  );

  const handleChange = useCallback(async () => {
    if (url !== null && reg.test(url)) {
      await MeetworkApi.event.update(eventId, { meetingCode: url });
      await mutate();

      router.back();
    }
  }, [eventId, mutate, router, url]);

  const headerRight = useMemo(
    () => <CheckButton onClick={handleChange} />,
    [handleChange],
  );

  const handleUrl = useCallback(
    (text: string) => {
      if (text.length <= 12) {
        setUrl(text);
        if (
          (url?.length === 2 && text.length === 3) ||
          (url?.length === 7 && text.length === 8)
        ) {
          setUrl(text + '-');
        }
      }
    },
    [url?.length],
  );

  return (
    <EventLayout
      header={{
        title: 'Meeting 설정',
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
            Google Meet 입장코드를 삽입해주세요.
          </span>
          <span className="font-[400] text-[14px] text-black">
            https://meet.google.com/
            <span className="font-[600] text-[14px] text-black">
              xxx-yyyy-zzz
            </span>
            에서
          </span>
          <span className="font-[400] text-[14px] text-black">
            굵은 글씨 부분만 적어주세요.
          </span>

          <Conditional condition={url !== null}>
            <CustomInput
              value={url ?? ''}
              setValue={handleUrl}
              placeholder="코드를 적어주세요."
              textStyle="font-[400] text-[18px]"
              error={(url?.length ?? 0) > 0 && !reg.test(url ?? '')}
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

export default Meeting;
