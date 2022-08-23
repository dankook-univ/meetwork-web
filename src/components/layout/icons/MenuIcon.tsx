import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

const reg = /^\/event\/[a-zA-Z0-9\-]+[a-zA-Z0-9]$/;
const regBoard =
  /^\/event\/[a-zA-Z0-9\-]+[a-zA-Z0-9]\/board\/[a-zA-Z0-9\-]+[a-zA-Z0-9]$/;

const MenuIcon: React.FC = () => {
  const router = useRouter();

  const color = useMemo(
    () =>
      reg.test(router.asPath) || regBoard.test(router.asPath)
        ? '#9BD1DD'
        : '#ECECEC',
    [router.asPath],
  );

  const handleOnClick = useCallback(async () => {
    const { id } = (await router.query) as { id: string };

    await router.push(`/event/${id}`);
  }, [router]);

  return (
    <div
      className="w-[30px] h-[30px] items-center justify-center"
      onClick={handleOnClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M3.75 15H26.25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 7.5H26.25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 22.5H26.25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default MenuIcon;
