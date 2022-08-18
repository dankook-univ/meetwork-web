import React, { useMemo } from 'react';

import BasicLayout, { BasicLayoutProps } from '@/components/layout/BasicLayout';
import MenuIcon from '@/components/layout/icons/MenuIcon';
import HomeIcon from '@/components/layout/icons/HomeIcon';
import UsersIcon from '@/components/layout/icons/UsersIcon';

interface EventLayoutProps extends Omit<BasicLayoutProps, 'footer'> {}

const EventLayout: React.FC<EventLayoutProps> = ({
  children,
  header,
  container,
}) => {
  const footer = useMemo<JSX.Element>(
    () => (
      <>
        <MenuIcon />
        <HomeIcon />
        <UsersIcon />
      </>
    ),
    [],
  );

  return (
    <BasicLayout
      header={{
        color: 'pink',
        style: 'min-h-[136px] pt-[78px]',
        ...header,
      }}
      container={container}
      footer={footer}
    >
      {children}
    </BasicLayout>
  );
};

export default EventLayout;
