import React from 'react';
import { NextPage } from 'next';

import { withAuthSSR } from '@/utils/session/withAuth';

import HomeLayout from '@/components/layout/HomeLayout';

interface NotificationProps {}

const Notification: NextPage<NotificationProps> = ({}) => {
  return (
    <HomeLayout header={{ title: '알림' }}>
      <div className="flex items-center justify-center">
        <span>Notification</span>
      </div>
    </HomeLayout>
  );
};

export const getServerSideProps = withAuthSSR(async () => {
  return {
    props: {},
  };
});

export default Notification;
