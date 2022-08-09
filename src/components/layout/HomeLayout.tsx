import React, { useMemo } from 'react';

import BasicLayout from '@/components/layout/BasicLayout';
import HomeIcon from '@/components/layout/icons/HomeIcon';
import NotificationIcon from '@/components/layout/icons/NotificationIcon';
import UserIcon from '@/components/layout/icons/UserIcon';

interface HomeLayoutProps {
  children: JSX.Element;
  header?: {
    title?: string;
    left?: JSX.Element;
    right?: JSX.Element;
  };
}

const HomeLayout: React.FC<HomeLayoutProps> = ({children, header}) => {
  const container = useMemo(() => ({
    style: 'rounded-tl-[20px] rounded-tr-[20px]'
  }), [])

  const footer = useMemo<JSX.Element>(
    () => (
      <>
        <HomeIcon/>
        <NotificationIcon/>
        <UserIcon/>
      </>
    ),
    [],
  );

  return (
    <BasicLayout header={header} container={container} footer={footer}>
      {children}
    </BasicLayout>
  );
};

export default HomeLayout;
