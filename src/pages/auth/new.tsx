import React, { useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import CustomInput from '@/components/form/CustomInput';
import CustomButton from '@/components/button/CustomButton';

const New: NextPage = () => {
  const router = useRouter();

  const handleOnClick = useCallback(() => {
    router.push('/workspace');
  }, [router]);

  return (
    <div className="flex min-w-screen min-h-screen items-center justify-center bg-gradient-to-b from-mint to-primary">
      <div className="flex flex-col w-full items-center p-[26px]">
        <span className="font-normal text-[26px] text-white">
          CREATE ACCOUNT
        </span>

        <div className="flex flex-col w-full mt-[90px] mb-[100px]">
          <CustomInput
            style="h-[52px] mb-[14px]"
            icon={{ src: '/icons/user.svg', width: 24, height: 24 }}
            placeholder="사용자 이름"
          />
          <CustomInput
            style="h-[52px]"
            icon={{ src: '/icons/mail.svg', width: 24, height: 24 }}
            placeholder="Email"
          />
        </div>

        <CustomButton style="w-full" label="계속" onClick={handleOnClick} />
      </div>
    </div>
  );
};

export default New;
