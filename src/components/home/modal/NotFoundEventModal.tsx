import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useSetRecoilState } from 'recoil';

import { joinEventState } from '@/stores/event/join-event';

const NotFoundEventModal: React.FC = () => {
  const router = useRouter();

  const setJoinEvent = useSetRecoilState(joinEventState);

  const visible = useMemo<boolean>(
    () => router.asPath.includes('?error=true'),
    [router.asPath],
  );

  const handleClose = useCallback(
    async (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        await router.push('/');

        setJoinEvent({
          code: '',
          nickname: '',
        });
      }
    },
    [router, setJoinEvent],
  );

  return (
    <div
      className={classNames(
        'absolute top-0 z-[100] flex flex-col w-screen h-screen px-[56px] items-center justify-center bg-[rgba(54,54,54,0.3)]',
        `${visible ? '' : 'hidden'}`,
      )}
      onTouchEnd={handleClose}
    >
      <div className="flex flex-col w-full p-[12px] rounded-[12px] items-center bg-white">
        <span className="font-[600] text-[16px] text-black my-[36px]">
          이벤트를 찾을 수 없습니다.
        </span>

        <div
          className="flex w-full py-[10px] rounded-[10px] items-center justify-center bg-mint"
          onTouchEnd={handleClose}
        >
          <span className="font-[400] text-[16px] text-white">돌아가기</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundEventModal;
