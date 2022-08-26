import React, { useCallback } from 'react';
import classNames from 'classnames';

interface EditPostModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  visible,
  setVisible,
  email,
}) => {
  const handleClose = useCallback(
    async (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        setVisible(false);
      }
    },
    [setVisible],
  );

  const handleDone = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return (
    <div
      className={classNames(
        'absolute top-0 z-[100] flex flex-col w-screen h-screen px-[46px] items-center justify-center bg-[rgba(54,54,54,0.3)]',
        `${visible ? '' : 'hidden'}`,
      )}
      onTouchEnd={handleClose}
    >
      <section className="flex flex-col w-full p-[12px] rounded-[18px] items-center bg-white z-[200]">
        <div className="flex flex-col mt-[10px] mb-[10px] items-center">
          <span className="font-[400] text-[18px] text-mint whitespace-pre-wrap mb-[6px]">
            {email}
          </span>
          <span className="font-[400] text-[14px] text-black whitespace-pre-wrap">
            위 메일 주소로 퀴즈 결과를 전송했습니다!
          </span>
        </div>

        <div
          className="flex w-full py-[16px] rounded-[12px] mt-[6px] items-center justify-center bg-mint"
          onClick={handleDone}
        >
          <span className="font-[600] text-[16px] text-white">확인</span>
        </div>
      </section>
    </div>
  );
};

export default EditPostModal;
