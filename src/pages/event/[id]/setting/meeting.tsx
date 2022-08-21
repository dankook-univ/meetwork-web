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

const Meeting: NextPage<MeetingProps> = ({eventId}) => {
  const router = useRouter();

  const {data: event, mutate} = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );

  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (event && url === null) {
      setUrl(event?.meetingUrl ?? '');
    }
  }, [event, url]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo(
    () => <HeaderBackButton onClick={handleBack}/>,
    [handleBack],
  );

  const handleChange = useCallback(async () => {
    if (url !== null) {
      await MeetworkApi.event.update(eventId, {meetingUrl: url})
      await mutate();

      router.back()
    }
  }, [eventId, mutate, router, url]);

  const headerRight = useMemo(
    () => <CheckButton onClick={handleChange}/>,
    [handleChange],
  );

  return (
    <EventLayout
      header={{
        title: 'Meeting Room 설정',
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
            Meeting Room 링크를 삽입해주세요.
          </span>

          <Conditional condition={url !== null}>
            <CustomInput
              value={url as string}
              setValue={setUrl}
              placeholder="Meeting Room 링크"
            />
          </Conditional>
        </div>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const {id} = (await context.query) as { id: string };

    return {
      props: {
        eventId: id,
      },
    };
  },
);
export default Meeting;
