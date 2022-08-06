import React, { useCallback, useMemo, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import CustomInput from '@/components/form/CustomInput';
import CustomButton from '@/components/button/CustomButton';
import { signUp } from '@/operations/auth/sign-up';

const emailReg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const New: NextPage = () => {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const nameError = useMemo<boolean>(() => name.length < 2, [name]);
  const emailError = useMemo<boolean>(() => !emailReg.test(email), [email]);
  const buttonStatus = useMemo<boolean>(
    () => nameError || emailError,
    [nameError, emailError],
  );

  const handleOnClick = useCallback(async () => {
    const { type, token } = router.query as { type: 'kakao'; token: string };

    const { data } = await signUp({
      type,
      token,
      name,
      email,
    });

    await router.push('/workspace');
  }, [router, name, email]);

  return (
    <div className="flex min-w-screen min-h-screen items-center justify-center bg-gradient-to-b from-mint to-primary">
      <div className="flex flex-col w-full items-center p-[26px]">
        <span className="font-normal text-[26px] text-white">
          CREATE ACCOUNT
        </span>

        <div className="flex flex-col w-full mt-[90px] mb-[100px]">
          <CustomInput<string>
            value={name}
            setValue={setName}
            error={nameError}
            style="h-[52px] mb-[14px]"
            icon={{ src: '/icons/user.svg', width: 24, height: 24 }}
            placeholder="사용자 이름"
          />
          <CustomInput<string>
            value={email}
            setValue={setEmail}
            error={emailError}
            style="h-[52px]"
            icon={{ src: '/icons/mail.svg', width: 24, height: 24 }}
            placeholder="Email"
          />
        </div>

        <CustomButton
          style="w-full"
          label="계속"
          onClick={handleOnClick}
          disable={buttonStatus}
        />
      </div>
    </div>
  );
};

export default New;
