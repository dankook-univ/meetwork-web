import React from 'react';

import BasicLayout, { BasicLayoutProps } from '@/components/layout/BasicLayout';

interface EventLayoutProps extends Omit<BasicLayoutProps, 'footer'> {}

const EventLayout: React.FC<EventLayoutProps> = ({
  children,
  header,
  container,
}) => {
  return (
    <BasicLayout
      header={{
        color: 'pink',
        style: 'min-h-[136px] pt-[78px]',
        ...header,
      }}
      container={container}
    >
      {children}
    </BasicLayout>
  );
};

export default EventLayout;
