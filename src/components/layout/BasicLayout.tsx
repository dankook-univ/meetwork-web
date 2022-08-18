import React from 'react';
import classNames from 'classnames';
import Conditional from '@/hocs/Conditional';

export interface BasicLayoutProps {
  children: JSX.Element;
  header?: {
    title?: string;
    subTitle?: string;
    titleAlign?: 'left' | 'center';
    left?: JSX.Element;
    right?: JSX.Element;
    color?: 'white' | 'black' | 'pink';
    textColor?: 'white' | 'black' | 'pink';
    style?: React.HTMLAttributes<JSX.IntrinsicElements['div']>['className'];
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
        className={classNames(
          `flex flex-row items-center justify-between pt-[40px] pb-[25px] px-[16px]`,
          `bg-${header?.color ?? 'primary'}`,
          header?.style ?? '',
        )}
      >
        <Conditional condition={header?.titleAlign !== 'left'}>
          <section className="flex flex-1 flex-row items-center justify-start">
            {header?.left}
          </section>
        </Conditional>

        <section className="flex flex-col flex-5 items-center justify-center">
          <span
            className={classNames(
              `font-[700] text-[22px]`,
              `text-${header?.textColor ?? 'white'}`,
            )}
          >
            {header?.title}
          </span>

          <span
            className={classNames(
              `font-[400] text-[14px]`,
              `text-${header?.textColor ?? 'white'}`,
            )}
          >
            {header?.subTitle}
          </span>
        </section>

        <section className="flex flex-1 flex-row items-center justify-end">
          {header?.right}
        </section>
      </header>

      <div
        className={classNames(
          `flex flex-1 w-screen overflow-y-auto scrollbar-hide bg-white`,
          `${container?.style}`,
        )}
      >
        {children}
      </div>

      <footer
        className={classNames(
          `flex flex-row w-screen min-h-[70px] px-[50px] border-t-[3px] border-gray items-center justify-between bg-white`,
          `${footer ? '' : 'hidden'}`,
        )}
      >
        {footer}
      </footer>
    </div>
  );
};

export default BasicLayout;
