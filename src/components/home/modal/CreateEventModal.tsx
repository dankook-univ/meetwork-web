import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import BasicLayout from '@/components/layout/BasicLayout';
import CustomButton from '@/components/button/CustomButton';

const CreateEventModal: React.FC = () => {
  const router = useRouter();

  const visible = useMemo<boolean>(
    () => router.asPath.includes('?popup=true'),
    [router.asPath],
  );

  const handleClose = useCallback(async () => {
    await router.replace(router.pathname);
  }, [router]);

  const headerLeft = useMemo<JSX.Element>(
    () => (
      <div
        className="flex w-[30px] h-[30px] items-center justify-center"
        onClick={handleClose}
      >
        <Image
          src="/icons/x.svg"
          width={30}
          height={30}
          color="#667080"
          alt=""
        />
      </div>
    ),
    [handleClose],
  );

  const handleCreateEvent = useCallback(async () => {
    await router.push('/new/profile', '/new');
  }, [router]);

  return (
    <div
      className={`absolute top-0 z-[100] flex flex-col w-screen min-w-screen min-h-screen bg-white ${
        visible ? '' : 'hidden'
      }`}
    >
      <BasicLayout header={{ left: headerLeft, color: 'white' }}>
        <div className="flex flex-1 flex-col px-[40px] pb-[100px] items-center justify-center bg-white">
          <span className="font-[600] text-[16px] text-black mb-[200px]">
            새로운 이벤트를 시작해볼까요?
          </span>

          <CustomButton
            style="w-full rounded-[5px] bg-mint mb-[8px]"
            textStyle="font-[400]"
            label="공간 만들기"
            onClick={handleCreateEvent}
          />

          <CustomButton
            style="w-full rounded-[5px] border-[1px] border-mint"
            textStyle="font-[400] text-mint"
            label="공간 참가하기"
          />
        </div>
      </BasicLayout>
    </div>
  );
};

export default CreateEventModal;
