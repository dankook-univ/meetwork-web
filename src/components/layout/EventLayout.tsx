import React, { useMemo } from 'react';

import BasicLayout, { BasicLayoutProps } from '@/components/layout/BasicLayout';
import MenuIcon from '@/components/layout/icons/MenuIcon';
import HomeIcon from '@/components/layout/icons/HomeIcon';
import UsersIcon from '@/components/layout/icons/UsersIcon';

interface EventLayoutProps extends Omit<BasicLayoutProps, 'footer'> {
  footerShown?: boolean;
}

const EventLayout: React.FC<EventLayoutProps> = ({
  children,
  header,
  container,
  footerShown = true,
}) => {
  const footer = useMemo<JSX.Element | undefined>(
    () =>
      footerShown ? (
        <>
          <MenuIcon />
          <HomeIcon />
          <UsersIcon />
        </>
      ) : undefined,
    [footerShown],
  );

  return (
    <BasicLayout
      header={{
        color: 'pink',
        style: 'h-[136px] pt-[78px]',
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
