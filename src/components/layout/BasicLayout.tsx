import React from 'react';

interface BasicLayoutProps {
  children: JSX.Element;
  header?: {
    title?: string;
    left?: JSX.Element;
    right?: JSX.Element;
    color?: 'white' | 'black';
    textColor?: string;
  };
  container?: {
    style?: React.HTMLAttributes<JSX.IntrinsicElements['section']>['className'];
  };
  footer?: JSX.Element;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({
  children,
  header,
  container,
  footer,
}) => {
  return (
    <div className="flex flex-1 flex-col min-w-screen min-h-screen max-h-screen bg-primary">
      <header
        className={`flex flex-row items-center justify-between pt-[40px] pb-[25px] px-[16px] bg-${
          header?.color ?? 'primary'
        }`}
      >
        <section className="flex flex-1 flex-row items-center justify-start">
          {header?.left}
        </section>

        <section className="flex flex-1 items-center justify-center">
          <span
            className={`font-[700] text-[22px] text-${
              header?.textColor ?? 'white'
            }`}
          >
            {header?.title}
          </span>
        </section>

        <section className="flex flex-1 flex-row items-center justify-end">
          {header?.right}
        </section>
      </header>

      <div
        className={`flex flex-1 w-screen overflow-y-auto scrollbar-hide bg-white ${container?.style}`}
      >
        {children}
      </div>

      <footer
        className={`flex flex-row w-screen min-h-[70px] px-[50px] border-t-[3px] border-gray items-center justify-between bg-white ${
          footer ? '' : 'hidden'
        }`}
      >
        {footer}
      </footer>
    </div>
  );
};

export default BasicLayout;
