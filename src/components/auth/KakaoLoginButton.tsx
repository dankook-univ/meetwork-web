import React, { useCallback } from 'react';
import Image from 'next/image';

const KakaoLoginButton: React.FC = () => {
  const handleOnClick = useCallback(() => {}, []);

  return (
    <div
      className="flex flex-row w-[240px] h-[50px] px-[14px] py-[6px] rounded-[8px] items-center bg-[#FEE500] drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
      onClick={handleOnClick}
    >
      <Image src="/icons/kakao.svg" width={20} height={20} alt="" />
      <div className="flex flex-1 items-center justify-center">
        <span className="font-[400] text-[15px] text-black/85">
          카카오 로그인
        </span>
      </div>
    </div>
  );
};

export default KakaoLoginButton;
