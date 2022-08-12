import React, { useMemo } from 'react';
import Image from 'next/image';

interface KakaoLoginButtonProps {
  kakaoClientId: string;
}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({
  kakaoClientId,
}) => {
  const href = useMemo<string>(
    () =>
      `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams({
        client_id: kakaoClientId,
        redirect_uri: process.env.NEXT_PUBLIC_VERCEL_URL
          ? 'https://meetwork-web.vercel.app/auth/kakao'
          : 'http://localhost:3000/auth/kakao',
        response_type: 'code',
      }).toString()}`,
    [kakaoClientId],
  );

  return (
    <a href={href}>
      <div className="flex flex-row w-[240px] h-[50px] px-[14px] py-[6px] rounded-[8px] items-center bg-[#FEE500] drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
        <Image src="/icons/kakao.svg" width={20} height={20} alt="" />
        <div className="flex flex-1 items-center justify-center">
          <span className="font-[400] text-[15px] text-black/85">
            카카오 로그인
          </span>
        </div>
      </div>
    </a>
  );
};

export default KakaoLoginButton;
