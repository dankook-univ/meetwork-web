import React from 'react';

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

const HomeLayout: React.FC<HomeLayoutProps> = ({ children, header }) => {
  return (
    <div className="flex flex-col min-w-screen min-h-screen">
      <header className="fix top-0 flex flex-row min-h-[136px] items-center justify-between pt-[40px] pb-[60px] bg-primary">
        <section>{header?.left}</section>

        <span className="font-[700] text-[22px] text-white">
          {header?.title}
        </span>

        <section>{header?.right}</section>
      </header>

      <div className="absolute w-screen h-[calc(100vh-170px)] top-[100px] overflow-scroll overflow-h-auto rounded-tl-[20px] rounded-tr-[20px] bg-white">
        {children}
      </div>

      <footer className="fixed bottom-0 flex flex-row w-screen h-[70px] px-[50px] border-t-[3px] border-gray items-center justify-between">
        <HomeIcon />
        <NotificationIcon />
        <UserIcon />
      </footer>
    </div>
  );
};

export default HomeLayout;
