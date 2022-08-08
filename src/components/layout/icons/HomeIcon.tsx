import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

const HomeIcon: React.FC = () => {
  const router = useRouter();

  const color = useMemo<string>(
    () =>
      !router.pathname.startsWith('/notification') &&
      !router.pathname.startsWith('/me')
        ? '#9BD1DD'
        : '#ECECEC',
    [router?.pathname],
  );

  const handleOnClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div
      className="w-[30px] h-[30px] items-center justify-center"
      onClick={handleOnClick}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.75 11.25L15 2.5L26.25 11.25V25C26.25 25.663 25.9866 26.2989 25.5178 26.7678C25.0489 27.2366 24.413 27.5 23.75 27.5H6.25C5.58696 27.5 4.95107 27.2366 4.48223 26.7678C4.01339 26.2989 3.75 25.663 3.75 25V11.25Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.25 27.5V15H18.75V27.5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default HomeIcon;
